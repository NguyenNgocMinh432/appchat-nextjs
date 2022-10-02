import Head from "next/head"
import styled from "styled-components"
import Sidebar from "../../components/Sidebar"

const StyleContainer = styled.div`
    display: flex;
`
const Conversation = () => {
  return (
    <StyleContainer>
        <Head>
            <title> Conversation with Recipient </title>
        </Head>
        <Sidebar />
        <div> Messages </div>
    </StyleContainer>
  )
}

export default Conversation