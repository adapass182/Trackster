import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Snackbar } from '@material-ui/core'

// Snackbar component used to provide helper prompts when selecting tracks/artists for recommendations

class Message extends PureComponent {
	render() {
		const { handleClose, message, open } = this.props
		return (
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message-id'
				}}
				message={<span id="message-id">{message}</span>}
				action={[
					<Button
						key="confirm"
						color="secondary"
						size="small"
						onClick={handleClose}
					>
						GOT IT!
					</Button>
				]}
			/>
		)
	}
}

Message.propTypes = {
	handleClose: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired
}

export default Message
