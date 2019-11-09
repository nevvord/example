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
          theme: 'base16-dark'
        }
      }
    }
  }
</script>
