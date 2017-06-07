var MyFormComponent = React.createClass({render: function () {}});

MyFormComponent.Row = React.createClass({render: function () {}});
MyFormComponent.Label = React.createClass({render: function () {}});
MyFormComponent.Input = React.createClass({render: function () {}});
//父组件使用
var Form = MyFormComponent;

var App = (
  <Form>
    <Form.Row>
      <Form.Label/>
      <Form.Input/>
    </Form.Row>
  </Form>
);