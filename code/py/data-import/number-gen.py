import psycopg2
import uuid



conn = psycopg2.connect(host="47.100.198.255", dbname="armarium", user="armarium", password="armarium")
cur = conn.cursor()

selectSql = "select device_id from tb_device where serial_number is null"
updateSql = "update tb_device set serial_number = %s, qr_code = device_id where device_id = %s"

cur.execute(selectSql)

rows = cur.fetchall()

for row in rows:
    new_uuid = str(uuid.uuid1())
    cur.execute(updateSql, (new_uuid, row[0]))
    print(row[0])

conn.commit()
print('done')
