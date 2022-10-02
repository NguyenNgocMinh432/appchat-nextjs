import Avatar from '@mui/material/Avatar'
import React from 'react'
import styled from 'styled-components'
import { useRecipient } from '../hooks/useRecipient'

type RecipientAvatarProps = ReturnType<typeof useRecipient>

const StyledAvatar = styled(Avatar)`
    margin-right: 15px;
`

const RecipientAvatar = ( {recipient, recipientEmail}: RecipientAvatarProps ) => {
  return (
    <StyledAvatar>
        {recipient?.photoUrl ? <Avatar src={recipient?.photoUrl} /> 
    : <Avatar>{recipientEmail && recipientEmail[0].toLocaleUpperCase()}</Avatar>}
    </StyledAvatar>
  )
}

export default RecipientAvatar