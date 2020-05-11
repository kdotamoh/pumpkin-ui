export interface ManagementColumnDefinitions {
  title: string;
  dataIndex: string;
  key: string;
  render?: () => JSX.Element;
}
