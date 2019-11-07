<template>
    <div>
        <Add /> <!-- Добавление работы -->
        <Show /> <!-- Отрисовка контента -->
        <Html /><!-- Всплывающае окно изменения HTML -->
        <Change /><!-- Всплывающае окно изменения специализации-->
    </div>
</template>
<script>
import Add from './add'
import Show from './show'
import Html from './html'
import Change from './change'

export default {
  components: {
    Add,
    Show,
    Html,
    Change
  },
	data() {
	        return {
	            form: {
	                name: '',
	                description: '',
	                fiel: null,
	                technology: [],
	                projects: [],
	                inner: ''
	            },
	            techData: this.$store.state._Technology,
	            worksData: this.$store.state._Works,
	            changeHTMLIneer: false,
	            html: {
	                id: '',
	                name: '',
	                inner: ''
	            },
	            workForChange: {
	                id: '',
	                name: '',
	                oldName: '',
	                description: '',
	                file: '',
	                newFile: null,
	                technology: [],
	                projects: []
	            }
	        }
	    },
	    created($store) {},
	    methods: {
	        delWork(id) {
	            this.$store.commit('deletWorks', id);
	            this.worksData = this.worksData.filter(u => u._id !== id);
	        },
	        setHtmlbody(html, id, name) {
	            this.html.inner = html;
	            this.html.id = id;
	            this.html.name = name;
	        },
	        setChangeInner() {
	            this.changeHTMLIneer = !this.changeHTMLIneer;

	            let bodyJson = {
	                id: this.html.id,
	                inner: this.html.inner
	            }
	            axios.put(this.$store.state._ServerHttp + 'workInner/' + this.html.id, bodyJson).then(res => {
	                this.$store.commit('changePutInnerWork', bodyJson);
	            })
	        },
	        setWork() {
	            const fd = new FormData();

	            if (this.workForChange.newFile) {
	                fd.append('image', this.workForChange.newFile, this.workForChange.newFile.name);
	            }
	            fd.append('name', this.workForChange.name);
	            fd.append('description', this.workForChange.description);
	            fd.append('technology', this.workForChange.technology);
	            fd.append('projects', this.workForChange.projects);
	            fd.append('inner', this.workForChange.inner);

	            axios.put(this.$store.state._ServerHttp + 'works/' + this.workForChange.id, fd).then(res => {
	                this.$store.commit('changeWork', res.data)
	            });
	        }
	    }
}
</script>

<style scoped>
.checkBox {
  padding: 5px;
  width: auto;
  height: 50px;
  margin-left: 15px;
  margin-bottom: 5px;
  padding-left: 30px;
  background-color: rgba(153, 153, 153, 0.089);
  border: solid 3px rgba(153, 153, 153, 0.384);
  border-radius: 5px;
}

.checkBox img {
  max-width: 55px;
  max-height: 35px;
}


.innerHTML {
	height: 50px;
}

.margCentr {
  margin: 0 12px;
}

.content {
	padding: 50px 0;
}

.botContent {
	margin-top: 50px;
}

.innerHtmlBlock {
	padding: 15px;
	background-color: rgb(236, 236, 236);
	border-radius: 12px;
	margin-bottom: 15px;
}

.imgInChangeBlock img {
  box-shadow: 0px 0px 15px black;
  border-radius: 10px;
}

.checkBoxProject {
  padding: 5px;
  border-bottom: solid 1px rgba(153, 153, 153, 0.342);
}
.imgCheckBox{
  height: 25px;
  padding: 0 10px;
  border-right: solid 1px rgba(0, 0, 0, 0.171) ; 
}
.margin-left {
  margin-left: 25px;
}

.max-width {
  max-width: 1075px;
}
</style>
