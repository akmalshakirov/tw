import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { users } from "../data/users";

export default function Login({ onLogin }) {
    const recaptchaRef = useRef(null);
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [limit, setLimit] = useState(5);

    return (
        <div className='min-h-screen flex items-center justify-center text-black bg-gradient-to-r from-blue-600 to-green-400 bg-size-200 animate-gradient-x px-4'>
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}>
                <div className='bg-white p-6 rounded-xl shadow-md w-88'>
                    <h2 className='text-xl font-bold text-center mb-4'>
                        Tizimga kirish
                    </h2>

                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={Yup.object({
                            username: Yup.string().required(
                                "Username kiritilishi shart!"
                            ),
                            password: Yup.string().required(
                                "Parol kiritilishi shart!"
                            ),
                        })}
                        onSubmit={(
                            values,
                            { setSubmitting, setFieldError }
                        ) => {
                            if (!captchaPassed) {
                                toast.error("CHAPTCHA dan o'ting!");
                                setSubmitting(false);
                                return;
                            }

                            setLimit(limit - 1);
                            const user = users.find(
                                (u) =>
                                    u.username && u.password === values.password
                            );

                            if (user) {
                                toast.success(
                                    "Tizimga muvaffaqiyatli kirildi!"
                                );
                                onLogin(user);
                            } else {
                                setFieldError(
                                    "username",
                                    "Username yoki parol noto'g'ri"
                                );
                            }

                            setSubmitting(false);
                            recaptchaRef.current.reset();
                            setCaptchaPassed(false);
                        }}>
                        <Form className='space-y-4'>
                            <div>
                                <Field
                                    name='username'
                                    type='text'
                                    placeholder='Username'
                                    className='w-full border border-gray-300 px-3 py-2 rounded'
                                />
                                <ErrorMessage
                                    name='username'
                                    component='div'
                                    className='text-red-500 text0sm mt-1'
                                />
                            </div>
                            <div>
                                <Field
                                    name='password'
                                    type='password'
                                    placeholder='Parol'
                                    className='w-full border border-gray-300 px-3 py-2 rounded'
                                />
                                <ErrorMessage
                                    name='password'
                                    component='div'
                                    className='text-red-500 text-sm mt-1'
                                />
                            </div>
                            {recaptchaRef ? (
                                <>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey='6Lf6uTQrAAAAACizi-4l-IPbUT8IsT_H5cOZ4ol9'
                                        onChange={() => setCaptchaPassed(true)}
                                        onExpired={() =>
                                            setCaptchaPassed(false)
                                        }
                                        className='mx-auto'
                                    />
                                </>
                            ) : (
                                <>reCAPTCHA yuklanmoqda</>
                            )}
                            <motion.button
                                disabled={limit === 0}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type='submit'
                                className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer'>
                                Yuborish
                            </motion.button>
                        </Form>
                    </Formik>
                </div>
            </motion.div>
        </div>
    );
}
