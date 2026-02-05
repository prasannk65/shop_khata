import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportToPDF = (transactions, inventory, dateRange) => {
    const doc = new jsPDF();
    const isInventoryOnly = transactions.length === 0;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(49, 167, 219);
    doc.text("Shop Khata Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Type: ${isInventoryOnly ? 'Inventory Status' : 'Transaction History'}`, 14, 32);
    doc.text(`Period: ${dateRange.start} to ${dateRange.end}`, 14, 39);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 46);

    let tableHead, tableBody;

    if (isInventoryOnly) {
        tableHead = [['Product Name', 'Cost Price', 'Sell Price', 'Current Stock', 'Value']];
        tableBody = inventory.map(item => [
            item.name,
            `Rs. ${item.cp}`,
            `Rs. ${item.sp}`,
            item.quantity,
            `Rs. ${(item.quantity * item.sp).toFixed(2)}`
        ]);
    } else {
        tableHead = [['Date', 'Customer', 'Type', 'Items', 'Profit/Loss', 'Total']];
        tableBody = transactions.map(t => {
            const itemsStr = t.items.map(i => {
                const prod = inventory.find(p => p.id === i.productId);
                return `${prod ? prod.name : 'Unknown'} (x${i.quantity})`;
            }).join(', ');

            let profitStr = 'N/A';
            if (t.type === 'sell') {
                const profit = t.items.reduce((acc, item) => {
                    const cp = item.costPrice || (inventory.find(p => p.id === item.productId)?.cp || 0);
                    return acc + (item.unitPrice - cp) * item.quantity;
                }, 0);
                profitStr = `Rs. ${profit.toFixed(2)}`;
            }

            return [
                new Date(t.timestamp).toLocaleDateString(),
                t.customerName,
                t.type.toUpperCase(),
                itemsStr,
                profitStr,
                `Rs. ${t.total.toFixed(2)}`
            ];
        });
    }

    autoTable(doc, {
        startY: 55,
        head: tableHead,
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [49, 167, 219] },
        styles: { fontSize: 9 }
    });

    if (!isInventoryOnly) {
        const totalRevenue = transactions.filter(t => t.type === 'sell').reduce((acc, t) => acc + t.total, 0);
        const finalY = doc.lastAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`Total Revenue: Rs. ${totalRevenue.toFixed(2)}`, 14, finalY);
    }

    doc.save(`ShopKhata_${isInventoryOnly ? 'Inventory' : 'Transactions'}_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = (transactions, inventory) => {
    const data = transactions.map(t => {
        const itemsStr = t.items.map(i => {
            const prod = inventory.find(p => p.id === i.productId);
            return `${prod ? prod.name : 'Unknown'} (x${i.quantity})`;
        }).join(', ');

        let profitValue = 0;
        if (t.type === 'sell') {
            profitValue = t.items.reduce((acc, item) => {
                const cp = item.costPrice || (inventory.find(p => p.id === item.productId)?.cp || 0);
                return acc + (item.unitPrice - cp) * item.quantity;
            }, 0);
        }

        return {
            Date: new Date(t.timestamp).toLocaleDateString(),
            Time: new Date(t.timestamp).toLocaleTimeString(),
            Customer: t.customerName,
            Type: t.type.toUpperCase(),
            Items: itemsStr,
            ProfitLoss: t.type === 'sell' ? profitValue : 'N/A',
            TotalAmount: t.total,
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `ShopKhata_Inventory_${new Date().toISOString().split('T')[0]}.xlsx`);
};
