import AuthActions from '@/modules/auth/auth-actions';

export default function Home(): React.ReactElement {
  return (
    <div
      style={{
        width: '100vh',
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        action={AuthActions.createAccount}
        style={{
          width: '400px',
          height: '250px',
          border: '1px solid #f7f7f7',
          borderRadius: '16px',
          boxShadow: 'rgb(215 215 215) 0px 4px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 48px',
        }}
      >
        <div
          style={{
            margin: '12px 0',
            flexDirection: 'column',
            display: 'flex',
            width: '100%',
          }}
        >
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"></input>
        </div>
        <div
          style={{
            margin: '12px 0',
            flexDirection: 'column',
            display: 'flex',
            width: '100%',
          }}
        >
          <label htmlFor="password">password</label>
          <input type="password" id="password" name="password"></input>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#000',
            color: '#fff',
            border: '1px solid',
            borderRadius: '12px',
            padding: '8px 16px',
          }}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
