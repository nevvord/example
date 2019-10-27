<template>
  <section class="container">
    <no-ssr placeholder="Codemirror Loading...">
      <codemirror v-model="$store.state.projects.form.inner" :options="cmOption"></codemirror>
    </no-ssr>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        cmOption: {
          tabSize: 4,
          foldGutter: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          keyMap: "sublime",
          mode: 'text/x-vue',
          theme: 'base16-dark',
          extraKeys: {
            'F11'(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            'Esc'(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    text-align: left;
    margin: 25px 0;
  }
</style>
