import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';

function ImageDialog(props) {
	const handleClose = () => {
		props.setOpen(false);
	};

	return (
		props.imgUrl && (
			<Dialog
				open={props.open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogContent className='p-0' style={{ fontSize: 0 }}>
					<img src={props.imgUrl} alt='large' />
				</DialogContent>
			</Dialog>
		)
	);
}

export default ImageDialog;
