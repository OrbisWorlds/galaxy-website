import {
  ButtonBase,
  ButtonBaseProps,
  CircularProgress,
  styled
} from "@mui/material";

interface Props extends ButtonBaseProps {
  loading?: boolean;
  buttonType?: "normal" | "cancel" | "border2" | "border";
}

export default function Button(props: Props) {
  return (
    <ButtonWrap
      className={props.buttonType || "normal"}
      disabled={props.loading}
      {...props}
    >
      {props.loading ? (
        <CircularProgress
          sx={{ "& svg": { color: "#7d77ff" } }}
          color="error"
          size={"20px"}
        />
      ) : (
        props.children
      )}
    </ButtonWrap>
  );
}

const ButtonWrap = styled(ButtonBase)`
  background-color: #2a267b;
  color: #fff;

  border-radius: 4px;
  padding: 12px 24px;
  box-shadow: 0px 3px 8px #dedee3;

  font-family: Heebo-Medium !important;
  :disabled {
    color: #544c8f;
  }
  &.border {
    border: 1px solid #2a267b;
    color: #5954cc;
    background-color: transparent;
  }
  &.border2 {
    border: 1px solid #515f7f;
    color: #515f7f;
    background-color: transparent;
    box-shadow: 0px 3px 8px #dedee3;
  }
  &.cancel {
    box-shadow: 0px 3px 8px #dedee3;
    border: 1px solid #f2f2f2;
    background-color: #f7fafc;
    color: #666;
  }
`;
