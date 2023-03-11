<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-striped display" id="tablaEmpleados">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="empleado in empleados" :key="empleado.id">
                            <td>{{ empleado.id }}</td>
                            <td>{{ empleado.firstName }}</td>
                            <td>{{ empleado.lastName }}</td>
                            <td>{{ empleado.age }}</td>
                            <td>{{ empleado.email }}</td>
                            <td>
                                <button class="btn btn-primary"
                                    v-bind="{ to: '/editar-empleado/' + empleado.id }">Editar</button>
                                <button class="btn btn-danger"
                                    v-bind="{ to: '/eliminar-empleado/' + empleado.id }">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

  
<script>
import { defineComponent, onMounted, ref, watch, nextTick} from "vue";
import { useEmpleadoStore } from '@/stores/empleadoStore'
import $ from "jquery";
//import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonsHtml5 from "datatables.net-buttons/js/buttons.html5";
import print from "datatables.net-buttons/js/buttons.print";
import pdfmake from "pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import JsZip from "jszip";
window.JsZip = JsZip;

DataTable.use({
    DataTablesLib,
    Buttons,
    ButtonsHtml5,
    print,
    pdfmake,
    vfsFonts,
});

export default {
    mounted() {
        this.getEmpleados();
    },
    data() {
        return {
            empleados: ref([]),
        }
    },
    methods: {
        getEmpleados() {
            const empleadoStore = useEmpleadoStore()
            empleadoStore.getEmpleados().then(() => {
                this.empleados = empleadoStore.empleados;
                this.initDataTable();
            });
        },
        initDataTable() {
            nextTick(() => {
                $("#tablaEmpleados").DataTable({
                    dom: "Bfrtip",
                });
            });
        }
    }
}
</script>
  
<style scoped>
@import "datatables.net-bs5";
</style>
  