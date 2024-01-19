type Props = {
  values: Item[];
};

export default ({ values }: Props) => {
  return (
    <div>
      {values.map((e, i) => (
        <label>
          <input type="checkbox" checked={e.selected} />
          {e.value}
        </label>
      ))}
    </div>
  );
};

export type Item = {
  value: string;
  selected: boolean;
};

const valuesToItemData = (values: string[]) => {
  return values.map<Item>((value) => ({
    value,
    selected: false,
  }));
};
