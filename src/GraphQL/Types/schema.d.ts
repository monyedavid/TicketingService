// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation | ISubscription;
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

/**
 * Return all active Tickets - Admin protceted route
 */
openTickets: IQTD;

/**
 * Return all in-active Tickets - Admin protceted route
 */
closedTickets: IQTD;

/**
 * Load all tickets made by customer
* Filter open or closed
 */
myTickets: IQTD;

/**
 * Load comments on ticket
* Admin(s) & Customer owner of ticket access restriction
 */
loadTCommentHistory: IQTcD;
login_default: string | null;
logout_: string | null;
me: me_union | null;
get_currentRegion: IMe | null;
register_default: string | null;
oauth: IOauthRedirect | null;
}

interface IMyTicketsOnQueryArguments {
state: boolean;
}

interface ILoadTCommentHistoryOnQueryArguments {
ticketId: string;
}

interface IOauthOnQueryArguments {
type: any;
}

interface IQTD {
__typename: "QTD";
ok: boolean;
message: string | null;
status: number;
error: Array<IError> | null;

/**
 * Data -> Tickets or Comments under a Ticket
 */
tickets: Array<ITicket | null> | null;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}

interface ITicket {
__typename: "Ticket";
id: string;
open: boolean | null;
request: string;
owner: string;
createdDate: string;
}

interface IQTcD {
__typename: "QTcD";

/**
 * ->> explicit request of ticket comments
 */
ok: boolean;
message: string | null;
status: number;
error: Array<IError> | null;

/**
 * Data -> Tickets or Comments under a Ticket
 */
history: ICommentsHistory;
}

interface ICommentsHistory {
__typename: "CommentsHistory";
ticketId: string;
open: boolean;
comments: Array<IITicketComment | null> | null;
}

interface IITicketComment {
__typename: "ITicketComment";
user_id: string;
full_name: string;
comment: string;
createdAt: string;
admin: boolean;
}

type me_union = ITResponse | IMe;



interface ITResponse {
__typename: "T_response";
ok: boolean;
message: string | null;
status: number;
error: Array<IError> | null;
}

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
id: string;
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

/**
 * Reply ticket in private channel
* accesible only customer who raised ticket & any admin
* can be rejecetd
 */
replyTicket: ITResponse;

/**
 * Add a new Ticket to raise-new-ticket channel
* Tickets can only be raised by customers?!
* can be rejcetd
 */
raiseTicket: ITResponse;

/**
 * Admin ECA
* Open | Close Ticket
 */
changeTicketState: ITResponse;
login: ITResponse;
logout: ITResponse;
register: ITResponse;
}

interface IReplyTicketOnMutationArguments {
ticketId: string;
reply: string;
}

interface IRaiseTicketOnMutationArguments {
request: string;
}

interface IChangeTicketStateOnMutationArguments {
ticket_id: string;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface ILogoutOnMutationArguments {
type: string;
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

interface ISubscription {
__typename: "Subscription";

/**
 * Reply ticket in private channel
* accesible only customer who raised ticket & any admin
 */
replyTicket: IITicketComment;

/**
 * Add a new Ticket to raise-new-ticket channel
* Tickets can only be raised by customers?!
 */
raisedTickets: ITicket;
}

interface IReplyTicketOnSubscriptionArguments {
ticketId: string;
}

interface IFile {
__typename: "File";
id: string;
filename: string;
mimetype: string;
encoding: string;
}
}

// tslint:enable
