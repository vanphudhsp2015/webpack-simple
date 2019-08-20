import React, { Component } from "react";
import form from "./form.scss";
import { Form, Input, Button } from "antd";

class FormComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "",
      author: "",
      categories: "",
      tags: "",
      visibility: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAdd(values);
      }
    });
  };
  onChangerView = () => {
    this.props.onChangerView();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 14 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 4
        }
      }
    };
    return (
      <div className={form.form}>
        <div className={form.formHeader}>
          <h2 className={form.formTitle}>Customized Validation</h2>
        </div>
        <div className={form.formContent}>
          <div className={form.tableAdd}>
            <Button
              type="primary"
              className={form.button}
              onClick={this.onChangerView}
            >
              Table
            </Button>
          </div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Title" className={form.formItem} hasFeedback>
              {getFieldDecorator("title", {
                initialValue: this.state.title,
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "The title is not valid"
                  }
                ]
              })(<Input className={form.formInput} />)}
            </Form.Item>
            <Form.Item label="Author" className={form.formItem} hasFeedback>
              {getFieldDecorator("author", {
                initialValue: this.state.author,
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "The author is not valid"
                  }
                ]
              })(<Input className={form.formInput} />)}
            </Form.Item>
            <Form.Item label="Categories" className={form.formItem} hasFeedback>
              {getFieldDecorator("categories", {
                initialValue: this.state.categories,
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "The categories is not valid"
                  }
                ]
              })(<Input className={form.formInput} />)}
            </Form.Item>
            <Form.Item label="Tags" className={form.formItem} hasFeedback>
              {getFieldDecorator("tags", {
                initialValue: this.state.tags,
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "The tags is not valid"
                  }
                ]
              })(<Input className={form.formInput} />)}
            </Form.Item>
            <Form.Item label="Visibility" className={form.formItem} hasFeedback>
              {getFieldDecorator("visibility", {
                initialValue: this.state.visibility,
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "The visibility is not valid"
                  }
                ]
              })(<Input className={form.formInput} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout} className={form.formItem}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(FormComponent);
