<script lang="ts">
    import {
        doesEmailExist,
        emailPasswordSignUp,
        emailPasswordSignIn,
    } from "supertokens-web-js/recipe/thirdpartyemailpassword";

    let email = "";
    let password = "";

    let error = "";

    async function signUp(email: string, password: string) {
        try {
            let response = await emailPasswordSignUp({
                formFields: [
                    {
                        id: "email",
                        value: email,
                    },
                    {
                        id: "password",
                        value: password,
                    },
                ],
            });

            if (response.status === "FIELD_ERROR") {
                // one of the input formFields failed validaiton
                response.formFields.forEach((formField) => {
                    if (formField.id === "email") {
                        // Email validation failed (for example incorrect email syntax),
                        // or the email is not unique.
                        error += `${formField.error}\n\n`;
                    } else if (formField.id === "password") {
                        // Password validation failed.
                        // Maybe it didn't match the password strength
                        error += `${formField.error}\n\n`;
                    }
                });
            } else {
                // sign up successful. The session tokens are automatically handled by
                // the frontend SDK.
                window.location.href = "/";
            }
        } catch (err: any) {
            if (err.isSuperTokensGeneralError === true) {
                // this may be a custom error message sent from the API by you.
                error += `${err.message}\n\n`;
            } else {
                error += "Oops! Something went wrong.\n\n";
            }
        }
    }

    async function checkEmail(email: string) {
        try {
            let response = await doesEmailExist({
                email,
            });

            if (response.doesExist) {
                error += "Email already exists. Please sign in instead\n\n";
            }
        } catch (err: any) {
            if (err.isSuperTokensGeneralError === true) {
                // this may be a custom error message sent from the API by you.
                error += err.message;
            } else {
                error += "Oops! Something went wrong.\n\n";
            }
        }
    }

    async function signUpClicked() {
        try {
            let res = await doesEmailExist({email})

            if (res.doesExist) {
                error = "An account already exists with this email. Try logging in instead"
            }
        } catch (error) {}

    }
</script>

<div>
    {#if error}
        <p id="error">{error}</p>
    {/if}
    <label for="email">Enter email</label><br />
    <input type="email" name="email" id="email" bind:value={email} /><br />
    <label for="password">Enter password</label><br />
    <input
        type="password"
        name="password"
        id="password"
        bind:value={password}
    />
    <br /><br />
    <button on:click={signUpClicked}>Sign up</button>

    <p>{email} {password}</p>
</div>
