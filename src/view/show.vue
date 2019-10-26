<template>
  <div style="width:900px;margin:0 auto;border:1px solid #ccc">
    <!-- <select id="a">
      <option value="addPer" @click="add('addPer')">添加个人信息模块</option>
      <option value="addJob" @click="add('addJob')">添加工作经验模块</option>
    </select>-->
    <template>
      <div class="mt30">
        <div>个人信息</div>
        <hr />
        <!-- <quill-editor
          class="editor"
          ref="myTextEditor"
          v-model="content1"
          :options="editorOption"
          @blur="onEditorBlur1($event)"
          @focus="onEditorFocus1($event)"
          @ready="onEditorReady1($event)"
          @change="onEditorChange1($event)"
        ></quill-editor>-->
        <div v-show="!perChange">
          姓名：
          <input type="text" v-model="name" />
          电话：
          <input type="text" v-model="phone" />
          年龄：
          <input type="text" v-model="age" />
          邮箱：
          <input type="text" v-model="email" />
          <div></div>
          <button @click="perChange=true">完成</button>
        </div>
        <div v-show="perChange" class="innerLeft">
          <span>姓名：{{name}}</span>
          <span>电话：{{phone}}</span>
          <span>年龄：{{age}}</span>
          <span>邮箱：{{email}}</span>
          <div>
            <button @click="perChange=false">修改</button>
          </div>
        </div>
      </div>
      <div class="mt30">
        <div>工作经验</div>
        <hr />
        <div v-show="!jobChange">
          <quill-editor
            class="editor"
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
          <button @click="jobChange=true">保存</button>
        </div>
        <div v-show="jobChange">
          <div v-html="content"></div>
          <button @click="jobChange=false">修改</button>
        </div>
      </div>
    </template>
    <div style="position:absolute;top:-10000px">
      <div
        class="row"
        id="pdfDom"
        style="padding-top: 55px;background-color:#fff;"
        v-html="pdfPage"
      ></div>
    </div>

    <button type="button" class="btn btn-primary" v-on:click="getPdf()">导出PDF</button>
  </div>
</template>
<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  data() {
    return {
      pdfPage: ``,
      perChange: true,
      jobChange: true,
      name: "李哲",
      phone: "13054271332",
      age: "25",
      email: "13054271332@163.com",
      content:
        '<h1>A公司 2018-2019 X<span style="color: rgb(230, 0, 0);">X工程师</span></h1><h3>主要职责：</h3><ul><li>.x<span style="background-color: rgb(255, 255, 102);">x</span><span style="background-color: rgb(153, 51, 255);">xxxx</span></li><li>xxxx<span class="ql-font-serif">x</span><strong class="ql-font-serif ql-size-large"><em><u>xxxxx</u></em></strong></li></ul>',
      content1: "1123213",
      htmlTitle: "我的简历",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"] // 清除文本格式
          ] //工具菜单栏配置
        },
        placeholder: "请在这里添加描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      }
    };
  },
  updated() {
     this.textChange()
  },
  methods: {
    add(value) {
      console.log(value);
    },
    textChange(){
      this.pdfPage =
        `<div>个人信息</div>
        <hr />
      <div class="innerLeft">
          <span>姓名：${this.name}</span>
          <span style='margin-left: 30px;'>电话：${this.phone}</span>
          <span style='margin-left: 30px;'>年龄：${this.age}</span>
          <span style='margin-left: 30px;'>邮箱：${this.email}</span>
      </div>` +
        `<div style="margin-top: 30px;">工作经验</div>
        <hr />` +
        this.content;
    },
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      console.log(editor);
    },
    // 失去焦点
    onEditorBlur1(editor) {},
    // 获得焦点
    onEditorFocus1(editor) {},
    // 开始
    onEditorReady1(editor) {},
    // 值发生变化
    onEditorChange1(editor) {
      this.content1 = editor.html;
      console.log(editor);
    },
    getPdf() {
      var title = this.htmlTitle;
      html2Canvas(document.querySelector("#pdfDom"), {
        allowTaint: true
      }).then(function(canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        let pageHeight = (contentWidth / 592.28) * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        let imgWidth = 595.28;
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        let PDF = new JsPDF("", "pt", "a4");
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        PDF.save(title + ".pdf");
      });
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
};
</script>
<style scoped>
.mt30 {
  margin-top: 30px;
}
.innerLeft span {
  margin-left: 30px;
}
.innerLeft span:first-child {
  margin-left: 0;
}
.flexEvery {
  display: flex;
  justify-content: space-evenly;
}
</style>