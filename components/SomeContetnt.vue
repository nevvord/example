<template>
    <b-container>
        <b-row class="SCCont">
            <b-col>
                <b-row>
                    <h3>НИКАКИХ КОМПРОМИССОВ</h3>
                </b-row>
                <b-row>
                    <p>Компания существует с 2003 г. и специализируется на реализации проектов в сферах IT и автоматизации. Начиная с поиска перспективных идей, мы воплощаем их в завершённые решения и добиваемся эффективной эксплуатации конечного продукта.</p>
                </b-row>
                <b-row>
                    <p>Во главе ставятся следующие качества:</p>
                </b-row>
                <b-row>
                    <ul>
                        <li>Безопасность</li>
                        <li>Конфиденциальность</li>
                        <li>Качество</li>
                        <li>Отказоустойчивость</li>
                        <li>Доступность</li>
                    </ul>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button squared variant="outline-danger" size="lg" to="/projects">НАШИ ПРОЕКТЫ</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped>
.SCCont {
    padding: 50px 15px;
}
h3 {
    color: #e5474b;
}
p, ul{
    padding: 12px 0;
    font-size: 18px;
    font-weight: 600;
    color: #414141;
}
li {
    padding: 5px 0;
}

ul {
    padding-left: 20px;
}
</style>
