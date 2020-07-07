import React, {FormEvent, useState} from 'react';
import {Button, Grid, IconButton, Snackbar, TextField, Typography, withStyles, WithStyles} from '@material-ui/core';
import {Close, Create} from '@material-ui/icons';
import {styles} from '../theme';

interface CreateNewTodoProps extends WithStyles<typeof styles> {
  onCreate: (title: string) => Promise<void>;
}

const CreateNewTodo: React.FC<CreateNewTodoProps> = ({onCreate, classes}) => {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
    await onCreate(title);
    setTitle('');
  };

  return (
    <div className={classes.createNewTodo}>
      <Typography variant="h6">Create new</Typography>
      <form onSubmit={handleCreate}>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField label="Title" value={title} onChange={event => setTitle(event.target.value)}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button startIcon={<Create/>}
                    color="primary"
                    type="submit"
            >
              Create New
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Todo successfully created!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <Close fontSize="small"/>
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(CreateNewTodo);
