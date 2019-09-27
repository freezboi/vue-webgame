<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
  export default {
    name: "TdComponent",
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number
    },
    methods: {
      onClickTd() {
        if(this.cellData) return;

        const rootData = this.$root.$data;
        this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

        let win = false;
        // 가로가 같을때
        if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
          win = true;
        }
        // 세로가 같을때
        if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
          win = true;
        }
        // 대각선이 같을때
        if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
          win = true;
        }
        // 역대각선이 같을때
        if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
          win = true;
        }

        if (win) { // 이긴 경우
          rootData.winner = rootData.turn;
          rootData.turn = 'O';
          rootData.tableData = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ];
        } else { // 지거나 무승부
          let all = true;
          rootData.tableData.forEach((row) => {
            row.forEach((cell) => {
              if(!cell) {
                all = false;
              }
            });
          });
          if (all) { // 무승부
            rootData.winner = '';
            rootData.turn = 'O';
            rootData.tableData = [
              ['', '', ''],
              ['', '', ''],
              ['', '', '']
            ];
          } else { // 게임 아직 안끝났을 때
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>