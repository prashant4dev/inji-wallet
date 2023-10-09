import {authorize, AuthorizeResult} from 'react-native-app-auth';
import {assign, EventFrom, send, sendParent, StateFrom} from 'xstate';
import {createModel} from 'xstate/lib/model';
import {MY_VCS_STORE_KEY} from '../shared/constants';
import {StoreEvents} from './store';
import {AppServices} from '../shared/GlobalContext';
import NetInfo from '@react-native-community/netinfo';
import {
  generateKeys,
  isCustomSecureKeystore,
} from '../shared/cryptoutil/cryptoUtil';
import SecureKeystore from 'react-native-secure-keystore';
import {KeyPair} from 'react-native-rsa-native';
import {ActivityLogEvents} from './activityLog';
import {log} from 'xstate/lib/actions';
import {verifyCredential} from '../shared/vcjs/verifyCredential';
import {getBody, getIdentifier} from '../shared/openId4VCI/Utils';
import {VCMetadata} from '../shared/VCMetadata';
import {
  CredentialWrapper,
  VerifiableCredential,
} from '../types/VC/EsignetMosipVC/vc';
import {CACHED_API} from '../shared/api';

const TIMEOUT_SEC = 10;

// OIDCErrors is a collection of external errors from the OpenID library or the issuer
enum OIDCErrors {
  OIDC_FLOW_CANCELLED_ANDROID = 'User cancelled flow',
  OIDC_FLOW_CANCELLED_IOS = 'org.openid.appauth.general error -3',

  INVALID_TOKEN_SPECIFIED = 'Invalid token specified',
  OIDC_CONFIG_ERROR_PREFIX = 'Config error',
}

const model = createModel(
  {
    issuers: [] as issuerType[],
    selectedIssuerId: '' as string,
    selectedIssuer: {} as issuerType,
    tokenResponse: {} as AuthorizeResult,
    errorMessage: '' as string,
    rawError: '' as string,
    loadingReason: 'displayIssuers' as string,
    verifiableCredential: null as VerifiableCredential | null,
    credentialWrapper: {} as CredentialWrapper,
    serviceRefs: {} as AppServices,

    publicKey: ``,
    privateKey: ``,
  },
  {
    events: {
      DISMISS: () => ({}),
      SELECTED_ISSUER: (id: string) => ({id}),
      DOWNLOAD_ID: () => ({}),
      COMPLETED: () => ({}),
      TRY_AGAIN: () => ({}),
      RESET_ERROR: () => ({}),
      CHECK_KEY_PAIR: () => ({}),
      CANCEL: () => ({}),
    },
  },
);

export const IssuerScreenTabEvents = model.events;
export const Issuer_Tab_Ref_Id = 'issuersMachine';

export const Issuers_Key_Ref = 'OpenId4VCI';
export const IssuersMachine = model.createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEtawK5gE6wLIEMBjAC2QDswA6CVABwBt8BPASTUxwGIIB7Cy8gDceAayqoM2PEVL8asBszaScCIT0L4ALsj4BtAAwBdQ0cShaPWMh19zIAB6IALAEYAnJWfuAzM4BsAKwAHN7BwQDsfgA0IEyIAEw+Ea6UBgkRwT7uEekGrhHOAL5FsRIc0iTkVPKKrOxSnNhYPFiUiloAZq0AtgINOARVcnSM9SqwamTCmrZkpqb2ltZz9k4Izgme3n5Boe7hUc6x8QgJ3gZpgT6BgRH+yYWBJWUDlbJUza2cACoASgBNAD6AEEAOIglgAOUWSBAyxsujIaxcWy8vgCITCkRicUSIQSlGyCQMETu7n84QKLxA5SkQw+lC+WF+gNBEOhelcZjhCNWcPWrgSJ0QQppdMGMmqTKwLRZ-2B4MhMISPIsVkRdgFooMvjS-jc9wezl1ARFZwiCUClFcN3czmcKWuPnFbwZ0uZnD+AFEAMren5A71-P4AeT+sPVKyRKIQrgMwX8lASCWCgVcgW8lt15oyEU8CSCloz6WcN38rom7v4sDA9DAhB0ZCgyg4nAAIqGAOpQgAyoZB7aBLHbkfhGv5oHWPgMBmclEigQM-lTVpyc9z+R8yfzriyPhTS4zlYq1aotfrjfILYGnH9ve9AGEft6hyxfb6AKrBsd8mPahBAmFPEEB8VwhS8XVkgKA5dXcE96SlOQeAAdzIegeHwCBW2wR8+E6ZAoG4PhxGmURxDdJCalQ9DMOwgY8LIAioCmGZtCRBZjCWCd-ynUVgNOMVSlpSjhmotCMKwnCsEY5imllVp2kYLpen6KsqOoGjJPolRZMI1iNHY-RjF-HitT4jYUwXZwgMpFMfHCGcIlze15zuFdghyA5UweBDJTEygSAbEQWDILRsAoLRiP4dQxEC4hgtC8KsEi0zo3MxxRVuQlLUCdxdUzbIhX8c14w8Iky1ucI1zTYI-PeaUgsIEKwoisAot4GKyLipqWuS1LuW49LkQA4I0SFdxwOXO1-HSUrbUuLZSX8XwMn8Vwy3qs94sS1qUva+S5SU7RuiwPpeqStqtDSzURos4IIMpB5i1moCHPNSbgi8QIDXcPLcltDIto0i69simU5QSVlFQ5GEuN5My7syuNkiTfJJvyDwiyCUrZ2tPwbimoDMhuYGAtobBTp6EF0C0YhWmQAAvIyyGi0jhDiiUGv4CmsCpmm6YZ5m5gM2YOJM+Go1u2NbJtFbJoyN7U3cc0V2tbxXH8FdHSPe0ycZXn+dp+msCZlnDsUjoqbU08NMN3oBZNs2RfUMXjJMSXx2GmXNbl9wFbJJJlfNB6bUiLYbiW-KIgifXpXts7HaF83mWOlSzptxDycph3jeTl2yLd+YTMGhHvYA64k01-2hUDg9PNK5J52CAwZ3TQpwNj4Sue23qAGkwCYAAFfBkBZR8AAknz7oE++9YEh8hCNPb-DLBTnKuPD+h15cKc0qptDaMcibxnm70TGX7weR7HzhJ+n2f56BReWAjUupcnZH4x8Tf-czAJ-Z7xAskS4YFiQeXOJ5F0591IBRgBQLA2gwAD2HqPFknV2bkUzv5Rk8DsBIJQTfLAosWacTVF7aWAECjZEoPlTy6Z1o5HOOaPwqRqoOQyGNTMKY478DwYg8KhC0FswEN1CisDcFgAQQQ6+aCSFzAWO-Chn9BRRE8HQv6msPCWmOCBFMhI0xBH8DHMkOQyS8PErRLCj4sCQCkTofA9BYAiNiuI22AVeASTojYuxYVkCOMmK7UhEtyGryRusGyER9SWgpIVCkYFAi5j3EmG4CZW4OSbsUGB7jGSeKsRAHxEB7H+KcRbNoVtVI9w0nk7ShTikBPkeLD2oTEaxkidErYQQyzxIzLmThlBKSrQzJsKkFjNJeOsbYopfiAl3xBFCR83pew3RUS4R0HTYndIeL0kCe4ogVSyB4ByMcNpjMENgZAnQmDXjqTM+gLixHYO5lQc5psrk3KmfU+gjT3YrN4l-eMnguF3HOAkDMDlEl6ITFXYxDosjnCONA14EjpSvMudc5styHH3NThUjOVSApoveZiz5dyfnF2aUNShFkppAqtCCzY4K0x9IMNafMDCDgPBJAeMZyAID1jvqGXAQ8HwvlHCvVpVC1ZeG5VsVMUQ9l9JNAM5wY0W6pnjJEXl-KwBzIWUsv5a9RTSs2K3OVOJFV6NtKkG4eVUytx+jymkZAeBFPgHCAlHwqWrIQAAWh-uaX1ZIw6WnuJVKIK0EhjNqGMaS7qP7-PWJaXMP0okmhTPmGOFJ4wVmyVnRkzJvWJsQC3IFOQNqJkKPmG4uZMiXF1JSTYhZ0i7DGReBsTYbwqCLUauMu4iRUh+pmIUG0km2gGQURMqNNibTzTg6UNS6LST0lAHt4TEDGJcoWWhI6xreACGSXNyKcmNQSs1S6+0tBrtjGGgZU6XqsqSMEc0ZJtwFRNAUHeGYz7Hvzae3a-V2oQ1aAka9VCwVROhS3PKfhlwFA+mNZMjxcgORskkI9IkUU8xzonPOpthb-LCW0gSoofB+C8GNFaLd4zLhjmMq+qCx5gYsoehcMcbi7g2imVW5H0yqrGjcPwlo6pzueZQfhMjGNYGY1-PwhISQFGeoJlILCwJeHWhmBVFahK-vnchCZBTSXYvjco4tCAch9LU7Va48ZHSUjORc4lUAsUlJk+sQZyYqrrgNFrZ9VrKR3uMR5TWZGf5tq0AzZsbnSO+0NNkNwbhHKQsEv7bcar8pgW8FsUI2r6zRZRhmNIMdVy5Dyuqyz84AhPXsqqlI0aSL5ZgjawdXSR26NOCmX2WxHS6k-Xxs+JQgA */
    predictableActionArguments: true,
    preserveActionOrder: true,
    id: Issuer_Tab_Ref_Id,
    context: model.initialContext,
    initial: 'displayIssuers',
    tsTypes: {} as import('./issuersMachine.typegen').Typegen0,
    schema: {
      context: model.initialContext,
      events: {} as EventFrom<typeof model>,
    },
    states: {
      displayIssuers: {
        description: 'displays the issuers downloaded from the server',
        invoke: {
          src: 'downloadIssuersList',
          onDone: {
            actions: ['setIssuers', 'unsetLoadingReason'],
            target: 'selectingIssuer',
          },
          onError: {
            actions: ['setError'],
            target: 'error',
          },
        },
      },
      error: {
        description: 'reaches here when any error happens',
        on: {
          TRY_AGAIN: [
            {
              description: 'not fetched issuers config yet',
              cond: 'shouldFetchIssuersAgain',
              actions: ['setLoadingIssuer', 'resetError'],
              target: 'displayIssuers',
            },
            {
              cond: 'isRawErrorOIDCConfigError',
              actions: 'resetError',
              target: 'selectingIssuer',
            },
            {
              description: 'not fetched issuers config yet',
              actions: ['setLoadingIssuer', 'resetError'],
              target: 'downloadIssuerConfig',
            },
          ],
          RESET_ERROR: {
            actions: 'resetError',
            target: 'idle',
          },
        },
      },
      selectingIssuer: {
        description: 'waits for the user to select any issuer',
        on: {
          DOWNLOAD_ID: {
            actions: sendParent('DOWNLOAD_ID'),
          },
          SELECTED_ISSUER: {
            actions: 'updateSelectedIssuerId',
            target: 'downloadIssuerConfig',
          },
        },
      },
      downloadIssuerConfig: {
        description: 'downloads the configuration of the selected issuer',
        invoke: {
          src: 'downloadIssuerConfig',
          onDone: {
            actions: 'setSelectedIssuers',
            target: 'checkInternet',
          },
          onError: {
            actions: 'setError',
            target: 'error',
          },
        },
      },
      checkInternet: {
        description: 'checks internet before opening the web view',
        invoke: {
          src: 'checkInternet',
          id: 'checkInternet',
          onDone: [
            {
              cond: 'isInternetConnected',
              target: 'performAuthorization',
            },
            {
              actions: ['setNoInternet', 'unsetLoadingReason'],
              target: 'error',
            },
          ],
          onError: {
            actions: () => console.log('checkInternet error caught'),
            target: 'error',
          },
        },
      },
      performAuthorization: {
        description:
          'invokes the issuers authorization endpoint and gets the access token',
        invoke: {
          src: 'invokeAuthorization',
          onDone: {
            actions: ['setTokenResponse', 'getKeyPairFromStore', 'loadKeyPair'],
            target: 'checkKeyPair',
          },
          onError: [
            {
              cond: 'isOIDCflowCancelled',
              actions: ['resetError', 'unsetLoadingReason'],
              target: 'selectingIssuer',
            },
            {
              cond: 'isOIDCConfigError',
              actions: ['setError', 'setOIDCConfigRawError'],
              target: 'error',
            },
            {
              actions: [
                'setError',
                (_, event) => console.log('error in invokeAuth - ', event.data),
              ],
              target: 'error',
            },
          ],
        },
      },
      checkKeyPair: {
        description: 'checks whether key pair is generated',
        entry: [send('CHECK_KEY_PAIR')],
        on: {
          CHECK_KEY_PAIR: [
            {
              cond: 'hasKeyPair',
              target: 'downloadCredentials',
            },
            {
              target: 'generateKeyPair',
            },
          ],
        },
      },
      generateKeyPair: {
        description:
          'if keypair is not generated, new one is created and stored',
        invoke: {
          src: 'generateKeyPair',
          onDone: [
            {
              actions: ['setPublicKey', 'setPrivateKey', 'storeKeyPair'],
              target: 'downloadCredentials',
            },
            {
              actions: ['setPublicKey', 'storeKeyPair'],
              cond: 'isCustomSecureKeystore',
              target: 'downloadCredentials',
            },
          ],
        },
      },
      downloadCredentials: {
        description: 'credential is downloaded from the selected issuer',
        invoke: {
          src: 'downloadCredential',
          onDone: {
            actions: ['setVerifiableCredential', 'setCredentialWrapper'],
            target: 'verifyingCredential',
          },
          onError: {
            actions: 'setError',
            target: 'error',
          },
        },
        on: {
          CANCEL: {
            target: 'selectingIssuer',
          },
        },
      },
      verifyingCredential: {
        description:
          'once the credential is downloaded, it is verified before saving',
        invoke: {
          src: 'verifyCredential',
          onDone: [
            {
              target: 'storing',
            },
          ],
          onError: [
            {
              actions: log((_, event) => (event.data as Error).message),
              //TODO: Move to state according to the required flow when verification of VC fails
              target: 'idle',
            },
          ],
        },
      },
      storing: {
        description: 'all the verified credential is stored.',
        entry: [
          'storeVerifiableCredentialMeta',
          'storeVerifiableCredentialData',
          'storeVcsContext',
          'storeVcMetaContext',
          'logDownloaded',
        ],
      },
      idle: {
        on: {
          COMPLETED: {
            target: 'done',
          },
          CANCEL: {
            target: 'selectingIssuer',
          },
        },
      },
      done: {
        entry: () => console.log('Reached done'),
        type: 'final',
      },
    },
  },
  {
    actions: {
      setIssuers: model.assign({
        issuers: (_, event) => event.data,
        loadingReason: null,
      }),
      setNoInternet: model.assign({
        errorMessage: 'noInternetConnection',
      }),
      unsetLoadingReason: model.assign({
        loadingReason: null,
      }),
      setError: model.assign({
        errorMessage: (_, event) => {
          console.log('Error occured ', event.data.message);
          return event.data.message === 'Network request failed'
            ? 'noInternetConnection'
            : 'generic';
        },
        loadingReason: null,
      }),
      setOIDCConfigRawError: model.assign({
        rawError: (_, event) =>
          typeof event.data.toString === 'function'
            ? event.data.toString()
            : '',
      }),
      resetError: model.assign({
        errorMessage: '',
        rawError: '',
      }),

      loadKeyPair: assign({
        publicKey: (_, event) => event.publicKey,
        privateKey: (context, event) =>
          event.privateKey ? event.privateKey : context.privateKey,
      }),
      getKeyPairFromStore: send(StoreEvents.GET(Issuers_Key_Ref), {
        to: context => context.serviceRefs.store,
      }),
      storeKeyPair: send(
        (_, event) => {
          return StoreEvents.SET(Issuers_Key_Ref, {
            publicKey: (event.data as KeyPair).public + ``,
            privateKey: (event.data as KeyPair).private + ``,
          });
        },
        {
          to: context => context.serviceRefs.store,
        },
      ),
      setLoadingIssuer: model.assign({
        loadingReason: 'displayIssuers',
      }),
      storeVerifiableCredentialMeta: send(
        context =>
          StoreEvents.PREPEND(MY_VCS_STORE_KEY, getVCMetadata(context)),
        {
          to: context => context.serviceRefs.store,
        },
      ),

      storeVerifiableCredentialData: send(
        context =>
          StoreEvents.SET(
            getVCMetadata(context).getVcKey(),
            context.credentialWrapper,
          ),
        {
          to: context => context.serviceRefs.store,
        },
      ),

      storeVcMetaContext: send(
        context => {
          return {
            type: 'VC_ADDED',
            vcMetadata: getVCMetadata(context),
          };
        },
        {
          to: context => context.serviceRefs.vc,
        },
      ),

      storeVcsContext: send(
        context => {
          return {
            type: 'VC_DOWNLOADED_FROM_OPENID4VCI',
            vcMetadata: getVCMetadata(context),
            vc: context.credentialWrapper,
          };
        },
        {
          to: context => context.serviceRefs.vc,
        },
      ),

      setSelectedIssuers: model.assign({
        selectedIssuer: (_, event) => event.data,
      }),
      updateSelectedIssuerId: model.assign({
        selectedIssuerId: (_, event) => event.id,
      }),
      setTokenResponse: model.assign({
        tokenResponse: (_, event) => event.data,
        loadingReason: 'settingUp',
      }),
      setVerifiableCredential: model.assign({
        verifiableCredential: (_, event) => {
          return event.data.verifiableCredential;
        },
      }),
      setCredentialWrapper: model.assign({
        credentialWrapper: (_, event) => {
          return event.data;
        },
      }),
      setPublicKey: assign({
        publicKey: (context, event) => {
          if (!isCustomSecureKeystore()) {
            return (event.data as KeyPair).public;
          }
          return event.data as string;
        },
        loadingReason: 'downloadingCredentials',
      }),

      setPrivateKey: assign({
        privateKey: (context, event) => (event.data as KeyPair).private,
      }),

      logDownloaded: send(
        context => {
          return ActivityLogEvents.LOG_ACTIVITY({
            _vcKey: getVCMetadata(context).getVcKey(),
            type: 'VC_DOWNLOADED',
            timestamp: Date.now(),
            deviceName: '',
            vcLabel: getVCMetadata(context).id,
          });
        },
        {
          to: context => context.serviceRefs.activityLog,
        },
      ),
    },
    services: {
      downloadIssuersList: async () => {
        return await CACHED_API.fetchIssuers();
      },
      checkInternet: async () => await NetInfo.fetch(),
      downloadIssuerConfig: async (context, _) => {
        return await CACHED_API.fetchIssuerConfig(context.selectedIssuerId);
      },
      downloadCredential: async context => {
        const body = await getBody(context);
        const response = await fetch(
          context.selectedIssuer.serviceConfiguration.credentialEndpoint,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + context.tokenResponse?.accessToken,
            },
            body: JSON.stringify(body),
          },
        );
        let credential = await response.json();
        credential = updateCredentialInformation(context, credential);
        return credential;
      },
      invokeAuthorization: async context => {
        return await authorize(context.selectedIssuer);
      },
      generateKeyPair: async context => {
        if (!isCustomSecureKeystore()) {
          return await generateKeys();
        }
        const isBiometricsEnabled = SecureKeystore.hasBiometricsEnabled();
        return SecureKeystore.generateKeyPair(
          Issuers_Key_Ref,
          isBiometricsEnabled,
          0,
        );
      },
      verifyCredential: async context => {
        return verifyCredential(context.verifiableCredential?.credential);
      },
    },
    guards: {
      hasKeyPair: context => {
        return context.publicKey != null;
      },
      isInternetConnected: (_, event) => !!event.data.isConnected,
      isOIDCflowCancelled: (_, event) => {
        // iOS & Android have different error strings for user cancelled flow
        const err = [
          OIDCErrors.OIDC_FLOW_CANCELLED_ANDROID,
          OIDCErrors.OIDC_FLOW_CANCELLED_IOS,
        ];
        return (
          !!event.data &&
          typeof event.data.toString === 'function' &&
          err.some(e => event.data.toString().includes(e))
        );
      },
      isOIDCConfigError: (_, event) => {
        return (
          !!event.data &&
          typeof event.data.toString === 'function' &&
          event.data.toString().includes(OIDCErrors.OIDC_CONFIG_ERROR_PREFIX)
        );
      },
      isRawErrorOIDCConfigError: (context, _) =>
        context.rawError.includes(OIDCErrors.OIDC_CONFIG_ERROR_PREFIX),
      shouldFetchIssuersAgain: context => context.issuers.length === 0,
      isCustomSecureKeystore: () => isCustomSecureKeystore(),
    },
  },
);

type State = StateFrom<typeof IssuersMachine>;

export function selectIssuers(state: State) {
  return state.context.issuers;
}

export function selectErrorMessage(state: State) {
  return state.context.errorMessage;
}

export function selectLoadingReason(state: State) {
  return state.context.loadingReason;
}

export function selectIsDownloadCredentials(state: State) {
  return state.matches('downloadCredentials');
}

export function selectIsDone(state: State) {
  return state.matches('done');
}

export function selectIsIdle(state: State) {
  return state.matches('idle');
}

export function selectStoring(state: State) {
  return state.matches('storing');
}

interface issuerType {
  id: string;
  displayName: string;
  logoUrl: string;
}

const updateCredentialInformation = (context, credential) => {
  let credentialWrapper: CredentialWrapper = {};
  credentialWrapper.verifiableCredential = credential;
  credentialWrapper.verifiableCredential.issuerLogo =
    context.selectedIssuer.logoUrl;
  credentialWrapper.identifier = getIdentifier(context, credential);
  credentialWrapper.generatedOn = new Date();
  credentialWrapper.issuerLogo = context.selectedIssuer.logoUrl;
  return credentialWrapper;
};

const getVCMetadata = context => {
  const [issuer, protocol, requestId] =
    context.credentialWrapper?.identifier.split(':');
  return VCMetadata.fromVC({
    requestId: requestId ? requestId : null,
    issuer: issuer,
    protocol: protocol,
    id: context.verifiableCredential?.credential.credentialSubject.UIN
      ? context.verifiableCredential?.credential.credentialSubject.UIN
      : context.verifiableCredential?.credential.credentialSubject.VID,
  });
};
