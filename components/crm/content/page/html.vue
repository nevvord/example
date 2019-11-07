<template>
  <section>
    <no-ssr placeholder="Codemirror Loading...">
      <codemirror v-model="$store.state.pages.form.inner" :options="cmOption"></codemirror>
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

</style>
