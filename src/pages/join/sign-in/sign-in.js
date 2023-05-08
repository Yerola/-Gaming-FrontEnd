import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";
import { useSession, signIn } from "next-auth/react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import styles from "./sign-in.module.scss";
import { FcGoogle } from "react-icons/fc";

function SignInPage() {
  const { data: session } = useSession();

  return (
    <>
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Iniciar sesión</h3>
         

          <Button  type="submit" onClick={() => signIn() }>
          <p><FcGoogle size={20}  /> Continúa con Google</p>
         
          </Button>

          <br />

          <LoginForm session={session} />

          <div className={styles.actions}>
            <Link href="/join/sign-up">Click aqui si no tienes cuenta</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}

export default SignInPage;
