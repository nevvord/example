<template>
  <div>
    <Add /> <!--Добавление специализации-->
    <Show /> <!--Нижний блок с контентом-->
    <ChangeHtml /> <!-- Всплывающае окно изменения HTML-->
    <ChangeSpecialization /> <!-- Всплывающае окно изменения специализации-->
  </div>
</template>
<script>
import axios from 'axios'
import Add from './add'
import Show from './show'
import ChangeHtml from './changeHtml'
import ChangeSpecialization from './changeSpecialization'

export default {
  components: {
    Add,
    Show,
    ChangeHtml,
    ChangeSpecialization
  }
}
</script>
