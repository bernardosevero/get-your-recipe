'use client';

import NavBar from '@/components/NavBar';
import { PageContainer } from '@/styled-components/PageContainer';
import { SubTitle, Title } from '@/styled-components/Texts';

export default function Home(): React.ReactElement {
  return (
    <>
      <NavBar />
      <PageContainer style={{ textAlign: 'center' }}>
        <Title>Sobre</Title>
        <SubTitle>Bem-vindo ao ReceitAl!</SubTitle>
        <p
          style={{ width: '50%', margin: '0 auto', whiteSpace: 'break-spaces' }}
        >
          Sua nova ferramenta indispensável para compartilhar receitas
          culinárias com facilidade! Se você tem receitas incríveis e quer
          compartilhá-las, mas encontra dificuldade com a tecnologia ou a
          escrita, este aplicativo foi feito para você. Com o ReceitAl, você
          pode gravar suas receitas falando de forma natural e informal. Nossa
          tecnologia de inteligência artificial transforma sua gravação de voz
          em uma receita escrita detalhada, incluindo ingredientes, materiais
          necessários e modo de preparo. Em poucos cliques, sua receita estará
          pronta para ser copiada e compartilhada com amigos, familiares ou nas
          redes sociais. Nossa plataforma é simples e acessível, projetada para
          que qualquer pessoa possa usar, independentemente do seu nível de
          habilidade tecnológica. Além disso, as últimas receitas gravadas
          estarão sempre disponíveis na sua conta, para que você possa revisitar
          e compartilhar suas criações culinárias sempre que desejar.
          Compartilhe suas tradições culinárias de forma fácil e rápida.
          Transforme suas palavras em deliciosas receitas escritas e espalhe seu
          amor pela culinária!
        </p>
      </PageContainer>
    </>
  );
}
