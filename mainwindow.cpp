#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QtWidgets>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
	create_table();
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::create_table()
{
	auto header = new QHeaderView()
	ui->tableView->setModel(model);
}