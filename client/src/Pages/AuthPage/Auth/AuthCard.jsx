//Form component for user signup and login with animated transitions
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import signupImg from "../../../assets/images/signup.jpg";
import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

//import necessary libraries for form handling and validation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TermsOfService from "../../../Components/Terms/TermOfService";
import PrivacyPolicy from "../../../Components/Terms/PrivacyPolicy";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { registerUser, loginUser } from "../../../lib/api/api";
import React from "react";

// Define validation schemas using Zod
// Schema for signup form
const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Schema for login form
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function SignupForm({ className, defaultMode, ...props }) {
  // State to toggle between login and signup forms
  const [isLogin, setIsLogin] = useState(defaultMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Choose the appropriate schema based on the form type
  const schema = isLogin ? loginSchema : signupSchema;

  // Initialize the form with React Hook Form and Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch("password");

  // Monitor password field for hashed values
  React.useEffect(() => {
    if (typeof passwordValue === 'string' && /^\$2[aby]\$\d{2}\$/.test(passwordValue)) {
      console.warn('⚠️ Bcrypt hash detected in password field! Clearing autofill...');
      setValue("password", "");
      alert('❌ Browser autofilled a hashed password! Please manually type your plain text password.');
    }
  }, [passwordValue, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Final check before submission
      if (typeof data.password === 'string' && /^\$2[aby]\$\d{2}\$/.test(data.password)) {
        alert('❌ Invalid password format! Please enter your plain text password, not a hash.');
        return;
      }

      let response;
      if (isLogin) {
        response = await loginUser(data);
      } else {
        response = await registerUser(data);
      }

      // بعد نجاح العملية خزني بيانات المستخدم في Redux وLocalStorage
      const userData = response.data;
      dispatch(
        loginSuccess({
          user: {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            isAdmin: userData.isAdmin,
          },
          token: userData.token,
        })
      );

      // Store token in localStorage
      if (userData.token) {
        localStorage.setItem('token', userData.token);
      }

      alert(isLogin ? "Logged in successfully!" : "Account created!");
      reset();

      // Redirect based on user role
      if (userData.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    // Container div with optional className and props
    <div className={cn("flex flex-col gap-2 ", className)} {...props}>
      {/* Animated presence for smooth transitions between forms */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Card component to hold the form */}
          <Card className="p-0 mb-2 overflow-hidden bg-white shadow-2xl dark:bg-lime-900">
            {/* Card content with grid layout for form and image */}
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                className="p-4 md:p-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Form fields grouped together */}
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">
                      {isLogin ? "Welcome Back" : "Create Your Account"}
                    </h1>
                    <p className="text-sm text-muted-foreground text-balance">
                      {isLogin
                        ? "Enter your credentials to access your account."
                        : "Enter your details below to create your account."}
                    </p>
                  </div>
                  {/* Email Field */}
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                      required
                    />
                    {errors.email && (
                      <p className="mt-0.5 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your
                      email with anyone else.
                    </FieldDescription>
                  </Field>
                  {/* Password + Confirm Password Section */}
                  <div className={`grid ${isLogin ? "" : "grid-cols-2 gap-4"}`}>
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        {isLogin && (
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline "
                          >
                            Forgot your password?
                          </a>
                        )}
                      </div>
                      <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        required
                      />
                      {errors.password && (
                        <p className="mt-0.5 text-sm text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </Field>

                    {!isLogin && (
                      <Field>
                        <FieldLabel htmlFor="confirm-password">
                          Confirm Password
                        </FieldLabel>
                        <Input
                          id="confirm-password"
                          type="password"
                          {...register("confirmPassword")}
                          required
                        />
                        {errors.confirmPassword && (
                          <p className="mt-0.5 text-sm text-red-500">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </Field>
                    )}
                  </div>
                  {/* Submit Button */}
                  <Field>
                    <Button className="bg-lime-600" type="submit">
                      {isLogin ? "Login" : "Create Account"}
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  {/* Social Media Signup/Login Buttons */}
                  <Field className="grid grid-cols-3 gap-4">
                    <Button variant="outline" type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="sr-only">Sign up with Apple</span>
                    </Button>
                    <Button variant="outline" type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="sr-only">Sign up with Google</span>
                    </Button>
                    <Button variant="outline" type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                          fill="currentColor"
                        />
                      </svg>

                      <span className="sr-only">Sign up with Meta</span>
                    </Button>
                  </Field>
                  <FieldDescription className="text-center">
                    {isLogin ? (
                      <>
                        Don't have an account?{" "}
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 font-medium text-lightGreen underline-offset-4 hover:underline"
                          onClick={() => setIsLogin(false)}
                        >
                          Sign up
                        </Button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 font-medium text-lightGreen underline-offset-4 hover:underline"
                          onClick={() => setIsLogin(true)}
                        >
                          Log in
                        </Button>
                      </>
                    )}
                  </FieldDescription>
                </FieldGroup>
              </form>
              <div className="relative hidden bg-muted md:block">
                <img
                  src={signupImg}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          {isLogin ? null : (
            <FieldDescription className="px-2 text-center text-muted-foreground ">
              By clicking continue, you agree to our{" "}
              <Button
                variant="link"
                className="p-0 underline-offset-4 hover:underline"
                onClick={() => setIsOpen(true)}
              >
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button
                variant="link"
                className="p-0 underline-offset-4 hover:underline"
                onClick={() => setIsPrivacyOpen(true)}
              >
                Privacy Policy
              </Button>
              .
            </FieldDescription>
          )}

          <TermsOfService isOpen={isOpen} setIsOpen={setIsOpen} />
          <PrivacyPolicy isOpen={isPrivacyOpen} setIsOpen={setIsPrivacyOpen} />
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}
