<template>
    <div class="container table-responsive card-light py-3 mt-4">
        <table class="table table-striped display text-nowrap" id="tablaEmpleados">
            <thead>
                <tr>
                    <th>No. Tarjeta</th>
                    <th>Nombre</th>
                    <th>RFC</th>
                    <th>Edad</th>
                    <th>Departamento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="empleado in empleados" :key="empleado.id">
                    <td>{{ empleado.numeroTarjeta }}</td>
                    <td>{{ empleado.nombre }}</td>
                    <td>{{ empleado.rfc }}</td>
                    <td>{{ empleado.nivelAcademico }}</td>
                    <td>{{ empleado.departamento.nombre }}</td>
                    <td>
                        <RouterLink class="btn btn-primary" v-bind="{ to: '/editar-empleado/' + empleado.id }">Editar
                        </RouterLink>
                        <button class="btn btn-danger" v-on:click="eliminarEmpleado(empleado.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

  
<script>
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import { useEmpleadoStore } from '@/stores/empleadoStore'
import Swal from 'sweetalert2'
import $ from "jquery";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonsHtml5 from "datatables.net-buttons/js/buttons.html5";
import print from "datatables.net-buttons/js/buttons.print";
import pdfmake from "pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import JsZip from "jszip";
//import {useEmpleadoService} from "./services/empleadoService";
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
                //if datatable is already initialized, redraw it
                if ($.fn.DataTable.isDataTable("#tablaEmpleados")) {
                    $("#tablaEmpleados").DataTable().destroy();
                }
            });
        },
        initDataTable() {
            nextTick(() => {
                $("#tablaEmpleados").DataTable({
                    dom: "Bfrtip",
                });
            });
        },
        eliminarEmpleado(id) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción es irreversible. Se eliminará el empleado y todas sus plazas.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const empleadoStore = useEmpleadoStore()
                    empleadoStore.eliminarEmpleado(id).then(() => {
                        this.getEmpleados();
                        Swal.fire(
                            '¡Eliminado!',
                            'El empleado ha sido eliminado.',
                            'success'
                        )
                    });
                }
            })
        },
    }
}
</script>
  
<style scoped>
@import "datatables.net-bs5";
</style>
  