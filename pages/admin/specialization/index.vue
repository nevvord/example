<template>
  <div class="bg-light pb-4">
    <Add /> <!--Добавление специализации-->
    <Show /> <!--Нижний блок с контентом-->
    <ChangeHtml /> <!-- Всплывающае окно изменения HTML-->
    <ChangeSpecialization /> <!-- Всплывающае окно изменения специализации-->
  </div>
</template>
<script>
import Add from '~/components/crm/content/specialization/add'
import Show from '~/components/crm/content/specialization/show'
import ChangeHtml from '~/components/crm/content/specialization/changeHtml'
import ChangeSpecialization from '~/components/crm/content/specialization/changeSpecialization'

export default {
  layout: 'cp',
  components: {
    Add,
    Show,
    ChangeHtml,
    ChangeSpecialization
  }
}
</script>
