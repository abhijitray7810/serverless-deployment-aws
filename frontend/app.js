const API_URL = 'https://xhi12qr00b.execute-api.us-east-1.amazonaws.com/prod';

let students = [];
let filteredStudents = [];

document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));
    document.getElementById('classFilter').addEventListener('change', handleFilter);
    document.getElementById('studentForm').addEventListener('submit', handleSubmit);
    
    document.getElementById('studentModal').addEventListener('click', (e) => {
        if (e.target.id === 'studentModal') closeModal();
    });
}

async function loadStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        
        if (data.students) {
            students = data.students;
            filteredStudents = [...students];
            updateStats();
            populateClassFilter();
            renderTable();
        }
    } catch (error) {
        showToast('Error loading students: ' + error.message, 'error');
    }
}

async function saveStudent(studentData) {
    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showToast('Student saved successfully!');
            closeModal();
            loadStudents();
        } else {
            throw new Error(result.errors ? result.errors.join(', ') : 'Failed to save');
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('Student deleted successfully');
            loadStudents();
        } else {
            throw new Error('Failed to delete');
        }
    } catch (error) {
        showToast('Error deleting student', 'error');
    }
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredStudents.length === 0) {
        tbody.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    tbody.innerHTML = filteredStudents.map(student => `
        <tr>
            <td>${escapeHtml(student.studentid)}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.class)}</td>
            <td>${student.age}</td>
            <td>
                <button class="btn-icon" onclick="editStudent('${student.studentid}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" onclick="deleteStudent('${student.studentid}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateStats() {
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalClasses').textContent = new Set(students.map(s => s.class)).size;
    
    const avgAge = students.length > 0 
        ? (students.reduce((sum, s) => sum + Number(s.age), 0) / students.length).toFixed(1)
        : 0;
    document.getElementById('avgAge').textContent = avgAge;
}

function populateClassFilter() {
    const select = document.getElementById('classFilter');
    const classes = [...new Set(students.map(s => s.class))].sort();
    const currentValue = select.value;
    
    select.innerHTML = '<option value="">All Classes</option>' +
        classes.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    select.value = currentValue;
}

function openModal() {
    document.getElementById('studentModal').classList.add('active');
    document.getElementById('modalTitle').textContent = 'Add Student';
    document.getElementById('studentForm').reset();
    document.getElementById('studentid').disabled = false;
}

function closeModal() {
    document.getElementById('studentModal').classList.remove('active');
}

function editStudent(id) {
    const student = students.find(s => s.studentid === id);
    if (!student) return;
    
    document.getElementById('studentid').value = student.studentid;
    document.getElementById('studentid').disabled = true;
    document.getElementById('name').value = student.name;
    document.getElementById('class').value = student.class;
    document.getElementById('age').value = student.age;
    document.getElementById('email').value = student.email || '';
    
    document.getElementById('modalTitle').textContent = 'Edit Student';
    document.getElementById('studentModal').classList.add('active');
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.studentid.toString().includes(query)
    );
    renderTable();
}

function handleFilter(e) {
    const className = e.target.value;
    filteredStudents = className 
        ? students.filter(s => s.class === className)
        : [...students];
    
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    if (searchQuery) {
        filteredStudents = filteredStudents.filter(s => 
            s.name.toLowerCase().includes(searchQuery)
        );
    }
    renderTable();
}

function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
        studentid: document.getElementById('studentid').value,
        name: document.getElementById('name').value,
        class: document.getElementById('class').value,
        age: parseInt(document.getElementById('age').value),
        email: document.getElementById('email').value
    };
    
    saveStudent(data);
}

function exportToCSV() {
    if (students.length === 0) {
        showToast('No data to export', 'error');
        return;
    }
    
    const headers = ['ID', 'Name', 'Class', 'Age'];
    const csvContent = [
        headers.join(','),
        ...students.map(s => [
            s.studentid,
            `"${s.name}"`,
            s.class,
            s.age
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('CSV downloaded successfully');
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${escapeHtml(message)}</span>
    `;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
