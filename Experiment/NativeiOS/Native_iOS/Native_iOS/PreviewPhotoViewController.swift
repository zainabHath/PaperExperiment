//
//  PreviewPhotoViewController.swift
//  Native_iOS
//
//  Created by Nouf Alturaief on 11/03/1441 AH.
//  Copyright © 1441 Nouf Alturaief. All rights reserved.
//

import UIKit

class PreviewPhotoViewController: UIViewController {

    var image: UIImage!
    
    @IBOutlet weak var photo: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        photo.image = image
        
        
        // Do any additional setup after loading the view.
    }
    
    
    @IBAction func saveButtonTapped(_ sender: UIButton) {
        NSLog("save button tapped")
        //UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil)
        let fileName = UUID().uuidString
        if (saveImage(image: image, fileName: fileName)) {
            NSLog("The image is saved")
        } else {
            print("error saving the image")
        }
    }
    
    func saveImage(image: UIImage, fileName: String) -> Bool {
        guard let data = image.jpegData(compressionQuality: 1) ?? image.pngData() else {
            return false
        }
        guard let directory = try? FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false) as NSURL else {
            return false
        }
        do {
            try data.write(to: directory.appendingPathComponent(fileName)!)
            return true
        } catch {
            print(error.localizedDescription)
            return false
        }
    }
    /*
    @IBAction func cancelButtonTapped(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }
    */
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
