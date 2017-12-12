using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography;
using UnityEngine;

public class Bitsler : MonoBehaviour {
	string serverSeed = "55200d8d7bd2bec7debd261536dba0b0f4ed341ef79116bbd03300afb397e731501c4037b5f8c7125d992a7949897dc3e4774901be55d839d6febaee566eaec8";
	string clientSeed = "d3fe899f7ff7cce35d1d7389cee0e4a163f59ebb";

	string seed;

	uint lucky;

	float luckyNumber;

	void Start() {
		BitslerRolls();
	}

	public byte[] SHA1(byte[] bytes)
	{
		using (SHA1Managed sha1 = new SHA1Managed())
		{
			byte[] hash = sha1.ComputeHash(bytes);
			return hash;
		}
	}

	public byte[] SHA512(byte[] bytes)
	{
		using (SHA512Managed sha512 = new SHA512Managed())
		{
			byte[] hash = sha512.ComputeHash(bytes);
			return hash;
		}
	}

	string rez = "";
	public void BitslerRolls() {
//		for (int nonce = 0; nonce < 100000; nonce++) {
		for (int nonce = 50; nonce >= 1; nonce--) {
			seed = serverSeed + '-' + clientSeed + '-' + nonce;
			do {
				seed = System.BitConverter.ToString(SHA1(System.Text.Encoding.UTF8.GetBytes(seed)));

				seed = seed.Replace("-", "");

				lucky = (uint)int.Parse(seed.Substring(0, 8), System.Globalization.NumberStyles.HexNumber);
			} while (lucky > 4294960000);

			luckyNumber = (lucky % 10000) / 100f;

			if (luckyNumber < 0) {
				luckyNumber = -luckyNumber;
			}

			Debug.Log(luckyNumber);
		}
	}
}
