import Logo from "@/assets/images/Schedule-amico.svg";
// import Google from "@/assets/images/Group.svg";
import * as St from "./LoginForm.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useLayoutEffect } from "react";
import configs from "@/configs";
import cookies from "@/utils/cookies";
import useAuth from "@/hooks/useAuth";
import { signIn } from "@/contexts/auth/actions";
// import useAuth from "@/hooks/useAuth";
// import instance from "@/utils/instance";
// import cookies from "@/utils/cookies";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const query = new URLSearchParams(location.search);
    const errorMessage = query.get("error_message");
    const token = query.get("token");

    const [messageApi, contextHolder] = message.useMessage();
    useLayoutEffect(() => {
        if (errorMessage) {
            messageApi.open({
                type: "error",
                content: <div>{errorMessage}</div>,
            });
            navigate(configs.routes.login);
        } else if (token) {
            cookies.setToken(token);

            const user = cookies.decodeJwt();
            dispatch(signIn({ user }));
        }
    }, [errorMessage, token]);

    const handleClick = () => {
        window.location.href = configs.publicRuntime.API_URL + "auth";
        // instance
        //     .get("auth")
        //     .then((res) => {
        //         const query = new URLSearchParams(location.search);
        //         // Navigate ...
        //         const token = query.get("token");
        //         console.log(token);
        //         cookies.setToken(token);
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    return (
        <>
            {contextHolder}
            <St.DivLogin className="login">
                <div className="login__container">
                    <div className="login__inner">
                        <img className="login-image" src={Logo} alt="" />
                        <h1 className="login-heading">Login</h1>
                        <h2 className="login-desc">
                            Join to create the future with us
                        </h2>
                        <div
                            onClick={handleClick}
                            // href="http://localhost:8081/auth/google"
                            // href={configs.publicRuntime.API_URL + "auth/google"}
                            className="login-button"
                        >
                            {/* <button className="button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid"
                                    viewBox="0 0 256 262"
                                    className="svg"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                        className="blue"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                        className="green"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                        className="yellow"
                                    />
                                    <path
                                        fill="#EB4335"
                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                        className="red"
                                    />
                                </svg>
                                <span className="text">
                                    Continue with Google
                                </span>
                            </button> */}
                            <button className="button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid"
                                    viewBox="0 0 256 262"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                    ></path>
                                    <path
                                        fill="#34A853"
                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                    ></path>
                                    <path
                                        fill="#FBBC05"
                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                    ></path>
                                    <path
                                        fill="#EB4335"
                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                    ></path>
                                </svg>
                                <div>Login with Google</div>
                            </button>
                        </div>
                        <div className="login-contact">
                            <p>
                                Cannot login?{" "}
                                <a
                                    href="https://zalo.me/0982421071"
                                    className="login-contact-link"
                                >
                                    Contact admin
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </St.DivLogin>
        </>
    );
}

export default Login;
