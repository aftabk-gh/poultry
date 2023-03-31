import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import deleteIcon from "@src/assets/svgs/deleteone.svg";
import "./deleteModal.scss";

const DeleteModal = ({ open, handleClose, handleObjDelete }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} className="DeleteModal">
        <DialogContent className="DeleteModal__Content">
          <Box className="content-cls">
            <img className="hey-img" src={deleteIcon} alt="delete" />
            <Typography className="want-to-delete">
              {"Want to delete"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions className="DeleteModal__Actions">
          <>
            <Button
              onClick={handleClose}
              className="resetBtn"
              sx={{ ml: "12px !important" }}
            >
              {"No"}
            </Button>
            <Button
              onClick={handleObjDelete}
              className="submitBtn"
              sx={{ ml: "12px !important" }}
            >
              {"Yes"}
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
