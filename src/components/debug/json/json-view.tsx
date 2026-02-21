import JsonView from '@uiw/react-json-view'
import { githubDarkTheme } from '@uiw/react-json-view/githubDark'

export const JsonInspector: React.FC<{
  data: unknown
}> = ({ data }) => {
  return (
    <JsonView
      value={data as object}
      className="max-h-[80vh] overflow-y-auto"
      enableClipboard={false}
      collapsed={2}
      style={githubDarkTheme}
    />
  )
}
