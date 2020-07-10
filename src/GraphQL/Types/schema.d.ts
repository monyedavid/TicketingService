// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
replyTicket: ITResponse;
login_default: string | null;
logout_: string | null;
me: me_union | null;
get_currentRegion: IMe | null;
register_default: string | null;
oauth: IOauthRedirect | null;
}

interface IReplyTicketOnQueryArguments {
id?: string | null;
}

interface IOauthOnQueryArguments {
type: any;
}

interface ITResponse {
__typename: "T_response";
ok: boolean;
message: string | null;
status: number;
error: Array<IError> | null;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}

type me_union = ITResponse | IMe;



interface IMe {
__typename: "me";
ok: boolean;
message: string | null;
status: number;
error: Array<IError> | null;
data: IMeData;
}

interface IMeData {
__typename: "me_data";
id: number | null;
first_name: string | null;
last_name: string | null;
email: string | null;
phone_number: string | null;
role: number | null;
photo: string | null;
confirmed: boolean | null;
}

interface IOauthRedirect {
__typename: "oauth_redirect";
ok: boolean;
status: number;
path: string | null;
}

interface IMutation {
__typename: "Mutation";
login: ITResponse;
logout: ITResponse;
set_currentRegion: ITResponse;
register: ITResponse;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface ILogoutOnMutationArguments {
type: string;
}

interface ISetCurrentRegionOnMutationArguments {
region: any;
}

interface IRegisterOnMutationArguments {
first_name: string;
last_name: string;
email: string;
role: number;
password: string;
photo?: string | null;

  /**
   * provide token to register an admin account!
   */
token?: string | null;
}

interface IFile {
__typename: "File";
id: string;
filename: string;
mimetype: string;
encoding: string;
}

interface IInStringToIntKeyValue {
key?: string | null;
value?: number | null;
}

interface IReadOptions {

/**
 * Offset (paginated) where from entities should be taken.
 */
skip?: number | null;

/**
 * Limit (paginated) - max number of entities should be taken.
 */
take?: number | null;

/**
 * Order, in which entities should be ordered -> [P in keyof Entity]?: "ASC" | "DESC" | 1 | -1;
 */
order?: IInStringToIntKeyValue | null;

/**
 * Specifies what columns should be retrieved.
 */
select?: Array<string | null> | null;

/**
 * Find One By ID
 */
byId?: number | null;
}

interface IInStringToStringKeyValue {
key?: string | null;
value?: string | null;
}

interface IStringToIntKeyValue {
__typename: "StringToIntKeyValue";
key: string | null;
value: number | null;
}

interface IStringToStringKeyValue {
__typename: "StringToStringKeyValue";
key: string | null;
value: string | null;
}
}

// tslint:enable
