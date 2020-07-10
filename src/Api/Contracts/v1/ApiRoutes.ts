export default class v1_ApiRoutes {
    private Root = "api";
    private Version = "v1";
    public Base = "/" + this.Root + "/" + this.Version;
    public confirmEmail = "/confirm/:id";

    /**
     * @description  Local-Identity
     */
    public LocalIdentity() {
        return {
            Login: "/identity/Login",
            Register: "/identity/Register"
        };
    }

    /**
     * @description O-Auth Identity
     */
    public oauth() {
        return {
            twitter: "/twitter",
            google: "/google",
            facebook: "/facebook",
            microsoft: "/microsoft",
            linkedin: "/linkedin"
        };
    }
}
