function handleSelectAll(status) {
    // this.$refs.selection.selectAll(status);
    // console.log(this.$refs.selection.$children)
    this.$refs.selection.selectAll(status);
    console.log(this.selection)
};

function rowClassName(row, index) {
    if (index % 2 == 0) {
        return 'ivu-table-stripe-even';
    }
    else return 'ivu-table-stripe-odd';
};

function onSelect(selection, index) {
    // console.log(this.$refs.selection.data)
    this.selecteds = selection;
    console.log(this.selecteds)
};

function onDoubleClick(row, index) {
    console.log(row)
    //改变为勾选样式
    //将当前行加入到selection
    this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]._checked
}

