import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { users } from "../data/users";

export default function Login({ onLogin }) {
    const recaptchaRef = useRef(null);
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [limit, setLimit] = useState(2);

    useEffect(() => {
        toast.info(
            "Agar reCAPTCHA ekranga chiqmasa biroz kuting, bu muammo sizning internet tezlikingizdan bo'lishi mumkin",
            {
                delay: 777,
                autoClose: 7777,
            }
        );
        if (limit === 0) {
            toast.error(
                "Siz ko'p urunish qildingiz, keyinroq yana urunib ko'ring!"
            );
        } else if (limit === 1) {
            toast.warn("Sizda yana 1 ta urunish qoldi");
        }
    }, []);

    return (
        <div className='min-h-screen flex items-center justify-center text-black bg-gradient-to-r from-blue-600 to-green-400 bg-size-200 animate-gradient-x px-4 transition-all'>
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
                                toast.error("reCaptcha dan o'ting!");
                                setSubmitting(false);
                                return;
                            }

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
                                toast.error("Username yoki parol noto'g'ri");
                                setLimit(limit - 1);
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
                                    className='w-full border border-gray-300 px-3 py-2 rounded outline-none focus:border-blue-400'
                                    autoComplete='none'
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
                                    className='w-full border border-gray-300 px-3 py-2 rounded outline-none focus:border-blue-400'
                                    autoComplete='none'
                                />
                                <ErrorMessage
                                    name='password'
                                    component='div'
                                    className='text-red-500 text-sm mt-1'
                                />
                            </div>
                            {limit === 0 ? (
                                <p className='text-center text-red-600'>
                                    Siz vaqtinchalik blokga tushdingiz
                                </p>
                            ) : (
                                <>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey='6Lfm6DQrAAAAAKhCYiAVSk-QqW2yJq3EGzzFvARF'
                                        onChange={() => setCaptchaPassed(true)}
                                        onExpired={() =>
                                            setCaptchaPassed(false)
                                        }
                                        className='mx-auto'
                                    />
                                </>
                            )}
                            <motion.button
                                disabled={limit === 0}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.99 }}
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
