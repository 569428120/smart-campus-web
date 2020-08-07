import React from 'react';
import {Upload, Icon, Modal} from 'antd';
import PropTypes from "prop-types";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  handleCancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({file, fileList, event}) => {
    const {onFileListChange} = this.props;
    const {response} = file;
    if (response) {
      (fileList || []).forEach(item => {
        if (item.uid === file.uid) {
          item.uid = response.id;
        }
      })
    }
    onFileListChange && onFileListChange([...fileList]);
  };

  render() {
    const {
      action,
      disabled,
      size,
      fileList,
    } = this.props;

    const {previewVisible, previewImage} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          accept={".jpg, .jpeg, .png"}
          disabled={disabled}
          headers={{Authentication: localStorage.getItem('antd-pro-authority')}}
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= size ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}

PicturesWall.propTypes = {
  // 上传路径
  action: PropTypes.string.isRequired,
  // 是否禁用
  disabled: PropTypes.bool,
  // 默认的文件列表
  defaultFileList: PropTypes.func,
  // 文件的数量
  size: PropTypes.number,
  // 文件
  fileList: PropTypes.array,
  // 文件变化
  onFileListChange: PropTypes.func,
};

PicturesWall.defaultProps = {
  size: 1,
};

export default PicturesWall;
