Array.from(document.getElementsByClassName('extended-markdown-table'))
    .forEach(function (value, index, array) {
        var create_modified_table = table => {
            let new_table = table.cloneNode(true);
            let deletes = [];
            for (let row_number = 0; row_number < new_table.rows.length; row_number++) {
                let cells = Array.from(new_table.rows[row_number].cells);
                for (let col_number = 0; col_number < cells.length; col_number++) {
                    switch (cells[col_number].textContent) {
                        case '>':
                            let right_cell = cells.find((e, i) => i > col_number && e.textContent !== '>');
                            if (right_cell == null) {
                                console.log('cannot find cell to be merged');
                                return;
                            }

                            let old_colspan = right_cell.getAttribute('colspan') ? parseInt(right_cell.getAttribute('colspan')) : 1;
                            right_cell.setAttribute('colspan', parseInt(old_colspan) + 1);
                            deletes.push([row_number, col_number]);
                            break
                        case '^':
                            let above_cell = (() => {
                                for (let i = row_number - 1; i >= 0; i--) {
                                    let tmp_cell = new_table.rows[i].cells[col_number];
                                    if (tmp_cell.textContent !== '^')
                                        return tmp_cell
                                }
                            })();
                            if (above_cell == null) {
                                console.log('cannot find cell to be merged');
                                return;
                            }

                            let old_rowspan = above_cell.getAttribute('rowspan') ? parseInt(above_cell.getAttribute('rowspan')) : 1;
                            above_cell.setAttribute('rowspan', old_rowspan + 1);
                            deletes.push([row_number, col_number]);
                            break
                    }
                }
            }

            deletes.sort((a, b) => {
                if (a[0] < b[0]) return 1;
                if (a[0] > b[0]) return -1;
                if (a[1] < b[1]) return 1;
                if (a[0] > b[0]) return -1;
                return 0;
            });
            for (let tmp of deletes) {
                new_table.rows[tmp[0]].deleteCell(tmp[1]);
            }
            return new_table;
        };

        new_table = create_modified_table(value);
        if (new_table != null)
            value.parentNode.replaceChild(new_table, value);
    });
