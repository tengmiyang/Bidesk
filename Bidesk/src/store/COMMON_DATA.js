export const USER_RULES = {
  pack_id_list: [
    {type: 'array', required: true, message: '请至少选择一个包件', trigger: 'change'}
  ],
  fileList: [
    {type: 'array', required: true, message: '请上传附件', trigger: 'change'}
  ],
  nickname: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'}
  ],
  noticeName: [
    {required: true, message: '请输入公告名称', trigger: 'change'},
  ],
  noticeContent: [
    {required: true, message: '请输入公告内容', trigger: 'change'},
  ],
  select_radio: [
    {required: true, message: '请选择时间', trigger: 'blur'},
  ],
  select_radio_end: [
    {required: true, message: '请选择时间', trigger: 'blur'},
  ],
  invite_by: [
    {len: 11, message: '手机号码长度不是11位', trigger: 'blur'}
  ],
  payment: [
    {type: 'number', required: true, message: '请输入合同金额', trigger: 'blur'}
  ],
  valid_time: [
    {type: 'array', required: true, message: '请选择时间', trigger: 'blur'}
  ],
  area_option: [
    {type: 'array', required: true, message: '请选择签约区域', trigger: 'blur'}
  ],
  submitEndTime: [
    {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
  ],
  saleEndTime: [
    {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
  ],
};
export const USER_FORM = {
  annexName: '',
  fileList: [],
  pack_id_list: [],
  fileToken: '',
  file_name: '',
  saleEndTime: null,
  submitEndTime: null,
  select_radio_end: '',
  select_radio: '',
  contact: '',
  noticeContent: '',
  noticeName: '',
  phone: '',
  defaultMediaList: [],
  customMediaList: []
};

export const DATE_OPTIONS = {
  disabledDate(time) {
    return time.getTime() < Date.now() - 3600 * 1000 * 24;
  }
}
