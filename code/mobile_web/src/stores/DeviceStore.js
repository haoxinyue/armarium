/**
 * Created by zhouzechen on 2018/4/18.
 */

import {observable, autorun} from 'mobx';
// import uuid from 'node-uuid';


export class DeviceStore {


  authorStore;
  transportLayer;
  @observable devices = [];
  @observable isLoading = true;

  constructor(transportLayer, authorStore) {

  }

  /**
   * 从服务端拉取所有的 todo
   */
  loadDevices() {
    this.isLoading = true;
    this.transportLayer.fetchDeviceList().then(fetchedDevices => {
      fetchedDevices.forEach(json => this.updateTodoFromServer(json));
      this.isLoading = false;
    });
  }

  /**
   * 使用服务器中的信息更新 todo。保证一个 todo 只存在一次。
   * 可能构造一个新的 todo，更新现有的 todo,
   * 或删除 todo，如果它已经在服务器上被删除的话。
   */
  updateTodoFromServer(json) {
    var device = this.devices.find(todo => todo.DeviceId === json.DeviceId);
    if (!device) {
      device = new DeviceInfo(this, json.DeviceId);
      this.devices.push(device);
    }
    if (json.isDeleted) {
      this.deleteDevice(device);
    } else {
      device.updateFromJson(json);
    }
  }

  /**
   * 在客户端和服务端都创建一个新的 todo
   */
  createDevice() {
    let device = new DeviceInfo(this);
    this.devices.push(device);
    return device;
  }

  /**
   * 如果一个 todo 被删除了，将其从客户端内存中清理掉
   */
  deleteDevice(device) {
    this.devices.splice(this.devices.indexOf(device), 1);
    device.dispose();
  }
}


export class DeviceInfo {

  /**
   * todo 的唯一 id, 不可改变。
   */
  DeviceId = null;//设备ID

  @observable DeviceCode="";//设备编号
  @observable DeviceName="";//设备名称
  @observable HospitalId="";//医院ID
  @observable DepartmentId="";//部门ID


  @observable Picture1 = "";//设备照片1
  @observable Picture2 = "";//设备照片2
  @observable Picture3 = "";//设备照片3
  @observable Picture4 = "";//设备照片4
  @observable Picture5 = "";//设备照片5

  @observable AssetNo = "";//设备资产编号
  @observable DeviceModel = "";//设备型号
  @observable DeviceDesc = "";//设备描述
  @observable DeviceState = "";//设备状态
  @observable DeviceType = "";//设备类型
  @observable SerialNumber = "";//设备序列号
  @observable UsageState = "";//使用状态
  @observable QRCode = "";//二维码编号
  @observable Manufacturer = "";//设备厂家
  @observable ProducingPlace = "";//设备产地
  @observable Accessory = "";//设备附件
  @observable SetupDate = "";//安装日期
  @observable AcceptDate = "";//验收日期
  @observable AcceptRemark = "";//验收评价
  @observable AcceptFile = "";//验收清单文件地址
  @observable UseDate = "";//使用日期
  @observable DeviceOwner = "";//设备负责人
  @observable StorageDate = "";//入库日期
  @observable PurchaseAmount = "";//采购金额
  @observable MaintenanceEndDate = "";//保修期结束时间
  @observable WarrantyBeginDate = "";//保修合同开始时间
  @observable WarrantyEndDate = "";//保修合同结束时间
  @observable WarrantyAmount = "";//保修合同金额
  @observable WarrantyContent = "";//保修合同内容
  //
  @observable SalesSupplier = "";//销售供应商名称
  @observable SalesSupplierContact = "";//销售供应商联系人
  @observable SalesSupplierPhone = "";//销售供应商电话
  @observable SalesSupplierDesc = "";//销售供应商描述
  @observable AfterSaleProvider = "";//售后服务供应商名称
  @observable AfterSaleProviderEngineer = "";//售后服务供应商工程师
  @observable AfterSaleProviderPhone = "";//售后服务供应商电话
  @observable AfterSaleProviderDesc = "";//售后服务供应商描述
  //
  @observable ContractId = "";//合同ID
  //
  @observable CreateTime = "";//创建时间
  @observable Creater = "";//创建人
  @observable ModifyTime = "";//最后修改时间
  @observable Modifier = "";//最后修改人





  store = null;


  /**
   * 为自动存储此 Todo 的副作用提供的清理方法
   * 参见 @dispose.
   */
  saveHandler = null;

  constructor(store, id=uuid.v4()) {
    this.store = store;
    this.DeviceId = id;

    this.saveHandler = reaction(
      // 观察在 JSON 中使用了的任何东西:
      () => this.asJson,
      // 如何 autoSave 为 true, 把 json 发送到服务端
      (json) => {
        if (this.autoSave) {
          this.store.transportLayer.saveDevice(json);
        }
      }
    );
  }

  /**
   * 在客户端和服务端中删除此 todo
   */
  delete() {
    this.store.transportLayer.deleteDevice(this.DeviceId);
    this.store.deleteDevice(this);
  }

  @computed get asJson() {
    return {
      DeviceId: this.DeviceId,
      // completed: this.completed,
      // task: this.task,
      // authorId: this.author ? this.author.id : null
    };
  }

  /**
   * 使用服务端信息更新此 DeviceInfo
   */
  updateFromJson(json) {

    const keys = [
      "DeviceId",
      "DeviceCode",
      "DeviceName",
      "HospitalId",
      "DepartmentId",

      "Picture1",
      "Picture2",
      "Picture3",
      "Picture4",
      "Picture5",
      "AssetNo",
      "DeviceModel",
      "DeviceDesc",
      "DeviceState",
      "DeviceType",
      "SerialNumber",
      "UsageState",
      "QRCode",
      "Manufacturer",
      "ProducingPlace",
      "Accessory",
      "SetupDate",
      "AcceptDate",
      "AcceptRemark",
      "AcceptFile",
      "UseDate",
      "DeviceOwner",
      "StorageDate",
      "PurchaseAmount",
      "MaintenanceEndDate",
      "WarrantyBeginDate",
      "WarrantyEndDate",
      "WarrantyAmount",
      "WarrantyContent",

      "SalesSupplier",
      "SalesSupplierContact",
      "SalesSupplierPhone",
      "SalesSupplierDesc",
      "AfterSaleProvider",
      "AfterSaleProviderEngineer",
      "AfterSaleProviderPhone",
      "AfterSaleProviderDesc",

      "ContractId",

      "CreateTime",
      "Creater",
      "ModifyTime",
      "Modifier",
    ];

    keys.map((key)=>{
      this[key] = json[key]
    })

    // 请确保我们的更改不会发送回服务器
    // this.autoSave = false;
    // this.completed = json.completed;
    // this.task = json.task;
    // this.author = this.store.authorStore.resolveAuthor(json.authorId);
    // this.autoSave = true;
  }

  dispose() {
    // 清理观察者
    // this.saveHandler();
  }
}



