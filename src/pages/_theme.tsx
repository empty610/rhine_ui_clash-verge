import getSystem from '@/utils/get-system'
const OS = getSystem()
export const defaultTheme = {
  primary_color: '#896329',
  secondary_color: '#b38648',
  primary_text: '#292a26',
  secondary_text: '#73746b',
  info_color: '#5c777b',
  error_color: '#b44d3e',
  warning_color: '#9a6c24',
  success_color: '#5b7860',
  background_color: '#f6f5ef',
  font_family:
    '"Segoe UI", "Microsoft YaHei UI", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, Arial, sans-serif' +
    (OS === 'windows' ? ', twemoji mozilla' : ''),
}
export const defaultDarkTheme = {
  ...defaultTheme,
  primary_color: '#d7b578',
  secondary_color: '#bc9a63',
  primary_text: '#e5e3d8',
  secondary_text: '#aaa99b',
  background_color: '#272922',
  info_color: '#91b2b4',
  error_color: '#ea9381',
  warning_color: '#d7b578',
  success_color: '#9ab799',
}
