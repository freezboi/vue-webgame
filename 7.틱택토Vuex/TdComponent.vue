<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
  import { mapState } from 'vuex';
  import {CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER} from "./store";

  export default {
    name: "TdComponent",
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number
    },
    computed: {
      ...mapState({
        tableData: state => state.tableData,
        turn: state => state.turn,
        cellData(state) {
          return state.tableData[this.rowIndex][this.cellIndex];
        }
      }),
      // cellData() {
      //   return this.$store.state.tableData[this.rowIndex][this.cellIndex]
      // },
      // tableData() {
      //   return this.$store.state.tableData;
      // },
      // turn() {
      //   return this.$store.state.turn;
      // }
    },
    methods: {
      onClickTd() {
        if(this.cellData) return;

        this.$store.commit(CLICK_CELL, { row: this.rowIndex, cell: this.cellIndex });

        let win = false;
        // 가로가 같을때
        if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn) {
          win = true;
        }
        // 세로가 같을때
        if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn) {
          win = true;
        }
        // 대각선이 같을때
        if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
          win = true;
        }
        // 역대각선이 같을때
        if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
          win = true;
        }

        if (win) { // 이긴 경우
          this.$store.commit(SET_WINNER, this.turn);
          this.$store.commit(RESET_GAME);
        } else { // 지거나 무승부
          let all = true;
          this.tableData.forEach((row) => {
            row.forEach((cell) => {
              if(!cell) {
                all = false;
              }
            });
          });
          if (all) { // 무승부
            this.$store.commit(NO_WINNER);
            this.$store.commit(RESET_GAME);
          } else { // 게임 아직 안끝났을 때
            this.$store.commit(CHANGE_TURN);
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>