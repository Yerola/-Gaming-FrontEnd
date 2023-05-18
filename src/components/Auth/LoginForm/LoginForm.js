import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useEffect } from "react";
import Error from "@/components/Error/Error";
import { useState } from "react";

const authCtrl = new Auth();

export function LoginForm({ session }) {
  const { login } = useAuth();

  const [error, setError] = useState();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (session) {
      (async () => {
        const data = {
          email: session.user.email,
          username: session.user.name.split(" ").join(""),
          name: session.user.name,
          //image: session.user.image,
          password:
            session.user.email.split("").reverse().join("") +
            session.user.name.split(" ").join(""),
        };
        const dataLogin = {
          identifier: session.user.name.split(" ").join(""),
          password:
            session.user.email.split("").reverse().join("") +
            session.user.name.split(" ").join(""),
        };

        try {
         
          const response = await authCtrl.login(dataLogin);
          console.log(response);
          login(response.jwt);
          router.push("/");
        } catch (error) {
          
          try {
            const res = await authCtrl.register(data);
            const response = await authCtrl.login(dataLogin);
            login(response.jwt);
            router.push("/");
          } catch (error) {
            console.log("estoy en el catch");
            console.error(error);

            <Error mensaje={error.error.message} />;
          }
        }
      })();
    }
  }, [session]);

  useEffect(() => {
    const isVisible = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(isVisible);
    //setVisible(true);
  }, [visible, error]);

  const formik = useFormik({
    initialValues: initialValues(session),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue);
        login(response.jwt);

        // router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
   
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electronico o nombre de usuario"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
    {error && visible && <Error msj={error} />}
    </>   

  );
}




