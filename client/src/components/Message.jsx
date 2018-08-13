import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

class Message extends PureComponent {
	render() {
		const { classes, handleClose, message, open } = this.props
		return (
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message-id'
				}}
				message={<span id="message-id">{message}</span>}
				action={[
					<Button
						key="OKAY"
						color="secondary"
						size="small"
						onClick={handleClose}
					>
						OKAY
					</Button>,
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				]}
			/>
		)
	}
}

Message.propTypes = {
	classes: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired,
	message: PropTypes.object.isRequired,
	open: PropTypes.object.isRequired
}

export default Message
