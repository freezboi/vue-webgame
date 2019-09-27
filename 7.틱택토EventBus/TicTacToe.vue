<template>
  <div>
    <div>{{turn}}님의 턴입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{winner}}님의 승리!</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent';
  import EventBus from './EventBus';

  export default {
    components: {
      TableComponent
    },
    data() {
      return {
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        turn: 'O',
        winner: ''
      }
    },
    methods: {
      onClickTd(rowIndex, cellIndex) {
        this.$set(this.tableData[rowIndex], cellIndex, this.turn);

        let win = false;
        // 가로가 같을때
        if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
          win = true;
        }
        // 세로가 같을때
        if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
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
          this.winner = this.turn;
          this.turn = 'O';
          this.tableData = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ];
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
            this.winner = '';
            this.turn = 'O';
            this.tableData = [
              ['', '', ''],
              ['', '', ''],
              ['', '', '']
            ];
          } else { // 게임 아직 안끝났을 때
            this.turn = this.turn === 'O' ? 'X' : 'O';
          }
        }
      }
    },
    created() {
      EventBus.$on('clickTd', this.onClickTd);
    }
  }
</script>

<style scoped>

</style>
