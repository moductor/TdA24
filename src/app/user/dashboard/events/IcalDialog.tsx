import { useEffect, useState } from "react";
import Icon from "../../../../components/widgets/Icon";
import Dialog from "../../../../components/widgets/dialogs/Dialog";
import DialogButtons from "../../../../components/widgets/dialogs/DialogButtons";
import DialogCloseButton from "../../../../components/widgets/dialogs/DialogCloseButton";
import DialogContentCustom from "../../../../components/widgets/dialogs/DialogContentCustom";
import Button from "../../../../components/widgets/forms/Button";
import TextFieldRow from "../../../../components/widgets/forms/TextFieldRow";
import { delay } from "../../../../helpers/delay";
import { getEndpoint } from "../../../../helpers/endpointUrl";
import { styleClasses } from "../../../../helpers/styleClasses";
import styles from "./IcalDialog.module.scss";

type Props = {
  show: boolean;
  hide: () => void;
  isLecturer: boolean;
  uuid: string;
};

export default function IcalDialog({ show, hide, isLecturer, uuid }: Props) {
  const [url, setUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!show) return;

    (async () => {
      const type = isLecturer ? "lecturer" : "user";
      const res = await fetch(getEndpoint(`/api/event/ical/${type}/${uuid}`), {
        method: "POST",
      });

      if (res.status != 200) return;

      setUrl(await res.text());
    })();
  }, [show]);

  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setCopySuccess(true);
    delay("copy buton - clear state", () => setCopySuccess(false), 1500);
  }

  return (
    <Dialog show={show} onBackdropClick={hide} onCancel={hide}>
      <DialogCloseButton onClick={hide} />
      <DialogContentCustom>
        <TextFieldRow
          type="url"
          value={url}
          onChange={() => {}}
          disabled={true}
          suffix={
            <button
              className={styleClasses(styles, "copy-button")}
              onClick={copyUrl}
            >
              {copySuccess ? (
                <Icon
                  icon="check"
                  className={styleClasses(styles, "success")}
                />
              ) : (
                <Icon icon="copy" />
              )}
            </button>
          }
        >
          URL kalendáře
        </TextFieldRow>
      </DialogContentCustom>
      <DialogButtons>
        <Button onClick={hide}>OK</Button>
      </DialogButtons>
    </Dialog>
  );
}
