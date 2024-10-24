import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #fff;
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #d0cfcf;

  strong {
    cursor: pointer;
  }

  ul {
    display: flex;
    list-style-type: none;
    width: 100%;
    justify-content: center;

    li {
      height: 50px;
      width: 120px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #bfbebe;
        cursor: pointer;
      }
    }
  }

  p {
    height: 50px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #bfbebe;
      cursor: pointer;
    }
  }
`;

export default function NavBar({}) {
  const router = useRouter();

  return (
    <Nav>
      <strong onClick={() => router.push('/crie-receita')}>RecipAI</strong>
      <ul>
        <li onClick={() => router.push('/crie-receita')}>Create recipe</li>
        <li onClick={() => router.push('/suas-receitas')}>Your recipes</li>
        <li onClick={() => router.push('/sobre-nos')}>About us</li>
      </ul>
      <p onClick={() => router.push('/login')}>Login</p>
      <p onClick={() => router.push('/api/logout')}>Logout</p>
    </Nav>
  );
}
